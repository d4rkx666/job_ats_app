import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ProBadge } from './Badge';
import { useAuth } from '../../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown (tables, etc.)
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, PageNumber, AlignmentType } from 'docx';
import {
  SparklesIcon,
  ArrowPathIcon,
  EyeIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  XMarkIcon,
  ChartBarIcon,
  LockClosedIcon,
  BoldIcon,
  ItalicIcon,
  ListBulletIcon,
  Bars3BottomLeftIcon,
  ArrowUturnLeftIcon
} from '@heroicons/react/24/outline';
import KeywordOptimizerModal from "../common/KeywordOptimizerModal";

export default function PreviewResumeLayout() {
  const { state } = useLocation();
  const {
    job_title = '',
    job_description = '',
    ats_score = 0,
    keywords = [],
    tips = [],
    resume = '',
  } = state?.draft || {};

  // Auth to check user
  const { user } = useAuth();
  const [isProUser, setIsProUser] = useState(false)

  // State management
  const [markdown, setMarkdown] = useState(resume);
  const [activeTab, setActiveTab] = useState('preview');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [optimizationType, setOptimizationType] = useState('free');
  const [optimizerState, setOptimizerState] = useState({
    show: false,
    isLoading: false,
    matchScore: ats_score,
    keywords: keywords,
    tips: tips,
  });

  // For markdown history revert
  const [history, setHistory] = useState([resume]);

  // Save state before making changes
  const saveState = () => {
    if (history[history.length - 1] !== markdown) {
      setHistory(prev => [...prev, markdown]);
    }
  };

  // Revert to previous version
  const undoChanges = () => {
    if (history.length > 1) {
      setMarkdown(history[history.length - 2]);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  // Detect Ctrl + Z to undo changes
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl+Z (Cmd+Z on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        undoChanges();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [history]); // Only re-run if history changes

  useEffect(() => {
    if (user) {
      setIsProUser(user.subscription.plan === "pro" || false)
    }
    // Initialize history with the current resume content
    setHistory([resume]);
  }, [user, resume])

  const handleOptimize = async (type) => {
    setOptimizerState(prev => ({ ...prev, isLoading: true }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newScore = Math.min(100, optimizerState.matchScore + 15);
      const newKeywords = [...optimizerState.keywords, `Skill${newScore}`];

      setOptimizerState(prev => ({
        ...prev,
        matchScore: newScore,
        keywords: newKeywords,
        isLoading: false
      }));

      // Update highlights
      setMarkdown(prev =>
        newKeywords.reduce((md, kw) =>
          md.replace(new RegExp(`\\b${kw}\\b`, 'gi'), match => `==${match}==`),
          prev
        )
      );
    } catch (error) {
      setOptimizerState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Markdown formatting functions
  const formatText = (prefix, suffix = prefix, placeholder = '') => {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    const newText = markdown.substring(0, start) +
      prefix + (selectedText || placeholder) + suffix +
      markdown.substring(end);
    setMarkdown(newText);
    // Focus back on textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selectedText.length || placeholder.length)
      );
    }, 0);
  };

  const ToolbarButton = ({ icon: Icon, onClick, tooltip }) => (
    <button
      onClick={onClick}
      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded"
      title={tooltip}
    >
      <Icon className="h-5 w-5" />
    </button>
  );


  // Custom component for highlighted text
  const HighlightedText = React.memo(({ children, keywords = [] }) => {
    // If no keywords or children is not a string, return as-is
    if (!keywords.length || typeof children !== 'string') {
      return children;
    }
  
    // Regex pattern for all keywords that should be highlighted
    const highlightPattern = new RegExp(
      keywords
        .filter(kw => kw.match)
        .map(kw => `\\b${escapeRegExp(kw.keyword)}\\b`)
        .join('|'),
      'gi'
    );
  
    // Split the text into parts, with matches wrapped in <mark>
    const parts = children.split(highlightPattern);
    const matches = children.match(highlightPattern) || [];
  
    return (
      <>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {matches[i] && (
              <mark className="rounded-lg px-1">
                {matches[i]}
              </mark>
            )}
          </React.Fragment>
        ))}
      </>
    );
  });

  // Helper function to escape regex special characters
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const components = {
    // Text containers
    p: ({ node, ...props }) => <p className="mb-4"><HighlightedText keywords={optimizerState.keywords} {...props} /></p>,
    span: ({ node, ...props }) => <span><HighlightedText keywords={optimizerState.keywords} {...props} /></span>,

    // Lists
    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-6 mb-4">
        <HighlightedText keywords={optimizerState.keywords} {...props} />
      </ul>
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal pl-6 mb-4">
        <HighlightedText keywords={optimizerState.keywords} {...props} />
      </ol>
    ),
    li: ({ node, ...props }) => <li className="mb-1"><HighlightedText keywords={optimizerState.keywords} {...props} /></li>,

    // Headings
    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4 border-b pb-2"><HighlightedText keywords={optimizerState.keywords} {...props} /></h1>,
    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-3"><HighlightedText keywords={optimizerState.keywords} {...props} /></h2>,

    // Special text processor
    text: ({ node, ...props }) => {
      if (typeof props.children === 'string' && props.children.includes('==')) {
        return <HighlightedText keywords={optimizerState.keywords}>{props.children}</HighlightedText>;
      }
      return props.children;
    },
  };

  const handleExport = async (type) => {
    setIsLoading(true);
    
    try {
      if (type === "pdf") {
        exportToPDF(markdown);
      } else if (type === "docx") {
        await exportToDOCX(markdown);
      }
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToPDF = (markdown) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const maxLineWidth = pageWidth - (margin * 2);
    let yPosition = 20;
    let currentPage = 1;
    const maxPages = 10;

    // Protect PDF
    if (!isProUser) {
      doc.setPermissions({
        printing: 'lowResolution', // Allow only low-res printing
        modifying: false,
        copying: false,
        annotating: false,
        fillingForms: false,
        contentAccessibility: false,
        assembleDocument: false
      });
    }
  
    // Set default font (keeping your original styling)
    doc.setFont('helvetica');
    doc.setFontSize(11);
  
    // Improved page break handler
    const checkSpace = (neededHeight) => {
      if (yPosition + neededHeight > pageHeight - margin) {
        doc.addPage();
        currentPage++;
        yPosition = margin;
        return true;
      }
      return false;
    };
  
    // Smart text adder with perfect wrapping
    const addText = (text, fontSize, options = {}) => {
      const { color, isBold, indent = 0 } = options;
      const currentFont = doc.getFont();
      
      // Apply styling
      doc.setFontSize(fontSize);
      if (isBold) doc.setFont(currentFont.fontName, 'bold');
      if (color) doc.setTextColor(color);
      
      // Calculate exact text dimensions
      const textLines = doc.splitTextToSize(text, maxLineWidth - indent);
      const lineHeight = fontSize * 0.50; // Optimal line height for Helvetica
      
      textLines.forEach(line => {
        // Check space including line height
        checkSpace(lineHeight);
        
        // Add the text
        doc.text(line, margin + indent, yPosition);
        yPosition += lineHeight;
      });
      
      // Reset styling
      doc.setFont(currentFont.fontName, 'normal');
      doc.setTextColor(0); // Reset to black
    };
  
    const sections = parseMarkdownToSections(markdown);
  
    // Add title (keeping your original style)
    const title = sections.find(s => s.type === 'h1')?.content || "My Resume";
    addText(title, 22, { isBold: true, });
    yPosition += 1;
  
    // Add contact info
    const contact = sections.find(s => s.type === 'contact');
    if (contact) {
      addText(contact.content, 12, { color: 100 });
      yPosition += 5;
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;
    }
  
    // Process all sections with perfect wrapping
    sections.forEach(section => {
      switch(section.type) {
        case 'h2':
          addText(section.content, 16, { color: 40, isBold: true });
          break;
          
        case 'h3':
          addText(section.content, 14, { color: 60, isBold: true });
          break;
          
        case 'list':
          section.items.forEach(item => {
            addText('• ' + item, 11, { indent: 5, color: 100 });
          });
          yPosition += 10;
          break;
          
        case 'ordered-list':
          section.items.forEach((item, index) => {
            addText(`${index + 1}. ${item}`, 11, { indent: 5, color: 100 });
          });
          yPosition += 10;
          break;
          
        case 'paragraph':
          addText(section.content, 11 ,{color: 100});
          yPosition += 10;
          break;
      }
    });
  
    // Add page numbers (keeping your style)
    for (let i = 1; i <= currentPage; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        `Page ${i} of ${currentPage}`,
        pageWidth - margin,
        pageHeight - 10,
        { align: 'right' }
      );
    }
  
    doc.save("resume.pdf");
  };

  const exportToDOCX = async (markdown) => {
    const sections = parseMarkdownToSections(markdown);
    
    // Filter out the h1 section since we'll handle it separately
    const mainSections = sections.filter(section => section.type !== 'h1');
    const nameSection = sections.find(section => section.type === 'h1');

    // Document-wide styles
    const styles = {
      heading1: {
        size: 28,
        color: "2d2d2d",
        bold: true,
        spacing: { after: 0 }
      },
      heading2: {
        size: 24,
        color: "3d3d3d",
        bold: true,
        spacing: { before: 300 }
      },
      heading3: {
        size: 20,
        color: "4d4d4d",
        bold: true,
      },
      body: {
        size: 22,
        color: "000000",
        spacing: { line: 300, after: 300 }
      },
      contact: {
        size: 22,
        color: "666666",
        spacing: { after: 200 }
      },
      list: {
        bullet: "•",
        indent: 300,
        spacing: { line: 250 }
      }
    };
  
    const children = mainSections.map(section => {
      switch(section.type) {
        case 'h1':
          return new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: section.content,
                bold: styles.heading1.bold,
                size: styles.heading1.size,
                color: styles.heading1.color
              })
            ],
            spacing: styles.heading1.spacing
          });
  
        case 'h2':
          return new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: section.content,
                bold: styles.heading2.bold,
                size: styles.heading2.size,
                color: styles.heading2.color
              })
            ],
            spacing: styles.heading2.spacing
          });
  
        case 'h3':
          return new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({
                text: section.content,
                bold: styles.heading3.bold,
                size: styles.heading3.size,
                color: styles.heading3.color
              })
            ],
            spacing: styles.heading3.spacing
          });
  
        case 'contact':
          return new Paragraph({
            children: [
              new TextRun({
                text: section.content,
                size: styles.contact.size,
                color: styles.contact.color
              })
            ],
            spacing: styles.contact.spacing,
            border: {
              bottom: {
                color: "CCCCCC",
                space: 1,
                style: "single",
                size: 6
              }
            }
          });
  
        case 'list':
          return section.items.map(item => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `${styles.list.bullet} ${item}`,
                  size: styles.body.size
                })
              ],
              indent: { left: styles.list.indent },
              spacing: styles.list.spacing
            })
          );
  
        case 'ordered-list':
          return section.items.map((item, index) => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}. ${item}`,
                  size: styles.body.size
                })
              ],
              indent: { left: styles.list.indent },
              spacing: styles.list.spacing
            })
          );
  
        default:
          return new Paragraph({
            children: [
              new TextRun({
                text: section.content,
                size: styles.body.size,
                color: styles.body.color
              })
            ],
            spacing: styles.body.spacing
          });
      }
    }).flat();
  
    const doc = new Document({
      styles: {
        paragraphStyles: [{
          id: "Normal",
          name: "Normal",
          run: {
            font: "Calibri",
            size: 22
          },
          paragraph: {
            spacing: { line: 276 }
          }
        }]
      },
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1000,
              right: 1000,
              bottom: 1000,
              left: 1000
            }
          }
        },
        children: [
          // Add name only once at the top
          ...(nameSection ? [new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: nameSection.content,
                bold: styles.heading1.bold,
                size: styles.heading1.size,
                color: styles.heading1.color
              })
            ],
            spacing: styles.heading1.spacing
          })] : []),
          
          // Add all other content
          ...children
        ]
      }]
    });
  
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "professional_resume.docx");
  };

  // Improved markdown parser with better formatting support
  const parseMarkdownToSections = (markdown) => {
    const lines = markdown.split('\n');
    const sections = [];
    let currentList = null;
    let currentOrderedList = null;

    lines.forEach(line => {
      line = line.trim();
      if (!line) return;

      // Parse inline formatting (bold, italic)
      const parseInlineFormatting = (text) => {
        return text
          .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers (handled in DOCX styling)
          .replace(/\*(.*?)\*/g, '$1')     // Remove italic markers
          .replace(/_(.*?)_/g, '$1');      // Remove underscore italic markers
      };

      if (line.startsWith('# ')) {
        closeCurrentLists();
        sections.push({ type: 'h1', content: parseInlineFormatting(line.substring(2)) });
      } 
      else if (line.startsWith('## ')) {
        closeCurrentLists();
        sections.push({ type: 'h2', content: parseInlineFormatting(line.substring(3)) });
      }
      else if (line.startsWith('### ')) {
        closeCurrentLists();
        sections.push({ type: 'h3', content: parseInlineFormatting(line.substring(4)) });
      }
      else if (line.startsWith('- ')) {
        if (!currentList) {
          closeCurrentLists();
          currentList = { type: 'list', items: [] };
          sections.push(currentList);
        }
        currentList.items.push(parseInlineFormatting(line.substring(2)));
      }
      else if (line.match(/^[0-9]+\. /)) {
        if (!currentOrderedList) {
          closeCurrentLists();
          currentOrderedList = { type: 'ordered-list', items: [] };
          sections.push(currentOrderedList);
        }
        currentOrderedList.items.push(parseInlineFormatting(line.replace(/^[0-9]+\. /, '')));
      }
      else if (line.includes('@') || line.toLowerCase().includes('email') || line.toLowerCase().includes('phone')) {
        closeCurrentLists();
        sections.push({ type: 'contact', content: parseInlineFormatting(line) });
      }
      else {
        closeCurrentLists();
        sections.push({ type: 'paragraph', content: parseInlineFormatting(line) });
      }
    });

    function closeCurrentLists() {
      currentList = null;
      currentOrderedList = null;
    }

    return sections;
  };

  const saveResume = async (markdown) => {
    // Implement your save logic here
  };

  return (
    <div className="flex flex-col h-fit bg-gray-50">
      {/* ATS Score Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {job_title || 'Your Resume'}
              {isProUser && (
                <ProBadge />
              )}
            </h2>
            <p className="text-sm text-gray-600">
              {job_description ? job_description.substring(0, 60) + '...' : 'No job description'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <ChartBarIcon className="h-5 w-5 text-blue-500" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-medium">Score:</span>
                <span className="font-bold">{optimizerState.matchScore}%</span>
              </div>
            </div>

            <button
              onClick={() => setOptimizerState(prev => ({ ...prev, show: true }))}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <ArrowPathIcon className="h-4 w-4" />
              Optimize
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 p-6">
        {/* Left: Resume Preview/Editor */}
        <div className="bg-white p-8 shadow-sm rounded-lg overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => {
                  // Save current state before switching
                  if (activeTab === 'editor') {
                    saveState();
                  }
                  setActiveTab('preview');
                }}
              >
                Preview
              </button>
              <button
                className={`px-4 py-2 font-medium flex items-center gap-1 ${activeTab === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => {
                  if (isProUser) {
                    // Save current state before switching
                    if (activeTab === 'preview') {
                      saveState();
                    }
                    setActiveTab('editor');
                  }
                }}
                disabled={!isProUser}
              >
                {!isProUser && <LockClosedIcon className="h-4 w-4" />}
                Editor
                {!isProUser && <ProBadge />}
              </button>
            </div>

            {/* Content */}
            {activeTab === 'preview' ? (
              markdown ? (
                <div id="resume-content" className="prose max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={components}
                    skipHtml // Improves performance
                  >
                    {markdown}
                  </ReactMarkdown>
                </div>

              ) : (
                <div className="text-center py-12 text-gray-500">
                  <DocumentTextIcon className="mx-auto h-12 w-12 mb-4 text-gray-300" />
                  <p>Your resume will appear here</p>
                </div>
              )
            ) : (
              <div className="space-y-2">
                {/* Markdown Toolbar (Pro Only) */}
                {isProUser && (
                  <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border border-gray-200 rounded-t-lg">
                    <ToolbarButton
                      icon={BoldIcon}
                      onClick={() => formatText('**', '**', 'bold text')}
                      tooltip="Bold"
                    />
                    <ToolbarButton
                      icon={ItalicIcon}
                      onClick={() => formatText('*', '*', 'italic text')}
                      tooltip="Italic"
                    />
                    <ToolbarButton
                      icon={Bars3BottomLeftIcon}
                      onClick={() => formatText('[', '](url)', 'link text')}
                      tooltip="Link"
                    />
                    <ToolbarButton
                      icon={Bars3BottomLeftIcon}
                      onClick={() => formatText('- ', '', 'list item')}
                      tooltip="Bullet List"
                    />
                    <ToolbarButton
                      icon={ListBulletIcon}
                      onClick={() => formatText('1. ', '', 'ordered item')}
                      tooltip="Numbered List"
                    />
                    <ToolbarButton
                      icon={CodeBracketIcon}
                      onClick={() => formatText('`', '`', 'code')}
                      tooltip="Inline Code"
                    />
                    <ToolbarButton
                      icon={ArrowUturnLeftIcon}
                      onClick={undoChanges}
                      tooltip="Undo (Ctrl + z)"
                      disabled={history.length <= 1}
                    />
                  </div>
                )}

                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className={`w-full min-h-screen p-4 font-mono text-sm border ${isProUser ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
                    } rounded-b-lg focus:ring-blue-500 focus:border-blue-500`}
                  placeholder={
                    isProUser
                      ? "Edit your resume in Markdown..."
                      : "Upgrade to Pro to edit your resume"
                  }
                  disabled={!isProUser}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Context Panel */}
        <div className="space-y-6">
          {/* Job Description Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold flex items-center gap-2 text-gray-800">
                <DocumentTextIcon className="h-5 w-5 text-gray-500" />
                Job Description
              </h3>
            </div>
            <div className="text-sm text-gray-700 max-h-60 overflow-y-auto">
              {job_description || 'No job description provided'}
            </div>
          </div>

          {/* Keywords Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold mb-3 text-gray-800">Target Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {optimizerState.keywords.map((kw, i) => (
                <span
                  key={i}
                  className={`${kw.match ? "bg-purple-100" : "bg-yellow-100" } text-blue-800 px-2 py-1 rounded text-xs font-medium`}
                >
                  {kw.keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Action Cards */}
          <div className="space-y-4">
            {/* Premium Optimization Tips */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-25 p-4 rounded-lg border border-amber-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-1.5 rounded-full">
                  <SparklesIcon className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1.5">Optimization Tip</h3>
                  <div className="text-sm text-amber-800 space-y-2">
                    {optimizerState.tips?.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-1">
                        {optimizerState.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    ) : optimizerState.matchScore > 75 ? (
                      <p>Excellent match! 🎉 Generate an AI-powered cover letter to complement your strong resume.</p>
                    ) : (
                      <p>
                        Almost there! Add {5 - Math.floor(optimizerState.matchScore / 20)} more relevant keywords
                        to reach the <span className="font-medium">optimal score</span>.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Export Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold mb-3 text-gray-800">Export Options</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsExportOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                >
                  <EyeIcon className="h-4 w-4" />
                  Export
                </button>
                {!isProUser && (
                  <Link
                    to="/pro"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium"
                  >
                    <SparklesIcon className="h-4 w-4" />
                    Unlock Pro
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Optimizer Modal */}
      {optimizerState.show && (
        <KeywordOptimizerModal
          jobDescription={job_description}
          currentKeywords={optimizerState.keywords}
          matchScore={optimizerState.matchScore}
          isProUser={isProUser}
          onOptimize={handleOptimize}
          onClose={() => setOptimizerState(prev => ({ ...prev, show: false }))}
          isLoading={optimizerState.isLoading}
          optimizationType={optimizationType}
          setOptimizationType={setOptimizationType}
          context="preview"
        />
      )}

      {/* Export Modal */}
      {isExportOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 animate-scale-in">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold">Export Resume</h3>
              <button
                onClick={() => setIsExportOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* PDF - Available for all */}
              <button
                onClick={() => handleExport('pdf')}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <DocumentTextIcon className="h-5 w-5 text-red-500 mr-3" />
                  <div>
                  <div className="flex items-center gap-2">
                      <p className="font-medium">PDF</p>
                    </div>
                    <p className="text-sm text-gray-500">Best for applications</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Free</span>
              </button>

              {/* DOCX - Pro only */}
              <button
                onClick={() => isProUser ? handleExport('docx') : null}
                disabled={!isProUser}
                className={`w-full flex items-center justify-between p-4 border rounded-lg ${isProUser ? 'border-gray-200 hover:bg-gray-50' : 'border-gray-100 bg-gray-50'
                  }`}
              >
                <div className="flex items-center">
                  <CodeBracketIcon className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">DOCX</p>
                      {!isProUser && <ProBadge size="xs" />}
                    </div>
                    <p className="text-sm text-gray-500">Editable in Word</p>
                  </div>
                </div>
                {isProUser ? (
                  <span className="text-sm text-gray-500">Pro</span>
                ) : (
                  <span className="text-sm text-blue-600">Upgrade</span>
                )}
              </button>
            </div>

            {!isProUser && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800 flex items-center gap-1">
                  <SparklesIcon className="h-4 w-4" />
                  Pro users unlock DOCX exports and advanced formatting
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}