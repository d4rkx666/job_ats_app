import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProBadge, ProFeatureEnabled, ProIco } from './Badge';
import { RoundedATSIndicador } from './RoundedATSIndicator';
import { useAuth } from '../../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import MarkdownStyle from './MarkdownStyle';
import remarkGfm from 'remark-gfm';
import SubmitButton from "./SubmitButton";
import { useConfig } from "../../contexts/ConfigContext"
import { motion } from "framer-motion";
import { get_pdf, get_docx } from "../../services/ExportResume"
import { save_resume } from '../../services/SaveCurrentResume';
import {get_ats_score} from "../../services/GetATSScore"
import {
  SparklesIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  XMarkIcon,
  ChartBarIcon,
  LockClosedIcon,
  BoldIcon,
  ItalicIcon,
  ListBulletIcon,
  Bars3BottomLeftIcon,
  ArrowUturnLeftIcon,
  ArrowDownTrayIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { KeywordList } from './KeywordList';
import ProTip from './ProTip';

export default function PreviewResumeLayout() {
  const location = useLocation();
  const {
    idCreation
  } = location.state || {};

  // Auth to check user
  const { user, system, logout } = useAuth();
  const [isProUser, setIsProUser] = useState(false);

  // To save resume
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Language
  const { config, language } = useConfig();
  const labels = config.labels[language];

  // Format highlight
  const highlightResume = (formatted_text, keyword) => {
    const keywords_array = keyword.map(obj => obj.keyword);
    const pattern = new RegExp(`\\b(${keywords_array.join('|')})\\b`, 'gi');
    return formatted_text.replace(pattern, match => `!!${match}!!`);
  }

  // State management
  const [creation, setCreation] = useState({
    ats: {
      ats_score :0,
      tips: [],
    },
    keywords: [],
    resume: "",
  })
  const [markdown, setMarkdown] = useState("");
  const [activeTab, setActiveTab] = useState('preview');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [showReanalyzeModal, setShowReanalyzeModal] = useState(false);

  // For markdown history revert
  const [history, setHistory] = useState([]);

  // Save state before making changes
  const saveState = () => {
    if (history[history.length - 1] !== markdown) {
      setHistory(prev => [...prev, markdown]);
    }
  };



  //cost
  const cost = ()=>{
    return (
      <>
        {system.resume_creation} {labels.dashboardPage.credit}
        {system.resume_creation !== 1 && 's'}
      </>
    )
  }

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
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        undoChanges();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [history]);


  // DETECT USER AND SET CREATION
  useEffect(() => {
    if (user) {
      let currentCreation = user.creations.find(item => item.id === idCreation);
      setIsProUser(user.subscription.plan === "pro" || false);
      setCreation(currentCreation);
      setMarkdown(highlightResume(currentCreation.resume, currentCreation.keywords));
      setHistory([markdown]);
    }
  }, [user]);

  const handleReanalyze = () => {
    setShowReanalyzeModal(true);
  };

  const confirmReanalyze =  async() => {
    setIsLoading(true);
    try{
      const regex = /!!(.*?)!!/gs;
      const cleaned_markdown = markdown.replace(regex, (match, p1) => p1);
      await get_ats_score({resume_markdown: cleaned_markdown, idCreation: creation.id}).then(response=>{
        if(response.success){
          setShowReanalyzeModal(false);
        }
      })
    }catch(error){
      if (error.status === 500) {
        logout();
      }
    }finally{
      setIsLoading(false);
    }
  };

  const formatText = (prefix, suffix = prefix, placeholder = '') => {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    const newText = markdown.substring(0, start) +
      prefix + (selectedText || placeholder) + suffix +
      markdown.substring(end);
    setMarkdown(newText);
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

  const handleExport = async (type) => {
    try {
      if (type === "pdf") {
        await exportToPDF();
      } else if (type === "docx") {
        await exportToDOCX();
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const exportToPDF = async () => {
    setIsExportingPdf(true);
    try {
      const element = document.getElementById('resume-content');
      if (!element) throw new Error('Resume content not found');
      const clone = element.cloneNode(true);
      const cleanedHTML = clone.innerHTML.replace(
        /<mark\b[^>]*>(.*?)<\/mark>/gi,
        '$1'
      );

      const prepareIcons = (html) => {
        const emojiMap = {
          '☎️': 'phone',
          '📧': 'email',
          '🌐': 'globe',
          '🚀': 'rocket'
        };
        return html.replace(/[☎️📧🌐🚀🛠️🤝🎨🔧]/gu, match =>
          `<span class="emoji ${emojiMap[match] || ''}">${match}</span>`
        );
      };

      const getExportHTML = () => `
      <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Resume</title>
          <style>
            body {
              font-family: 'Arial', 'Helvetica Neue', Arial, sans-serif;
            }
            @page {
              size: A4;
              margin: 0.5in;
            }
          </style>
        </head>
        <body>
          ${cleanedHTML}
        </body>
        </html>
      `;

      const response = await get_pdf({ html: getExportHTML() }).catch(error => {
        if (error.status === 500) {
          logout();
        }
      });

      if (response.success) {
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${response.pdf}`;
        link.download = "resume."+creation.job_title+".pdf";
        link.click();
      } else {
        throw new Error(response.type_error || 'PDF generation failed');
      }
    } catch (error) {
      console.error('PDF export failed:', error);
      alert(`Export failed: ${error.message}`);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const exportToDOCX = async () => {
    setIsExportingDocx(true);
    try {
      const clone = document.getElementById('resume-content').cloneNode(true);
      const cleanedHTML = clone.innerHTML
        .replace(/<mark[^>]*>(.*?)<\/mark>/gi, '$1');

      const docxData = await get_docx({ html: cleanedHTML }).catch(error => {
        if (error.status === 500) {
          logout();
        }
      });

      const blob = new Blob([docxData], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "resume."+creation.job_title+".docx";
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("DOCX export failed:", error);
    } finally {
      setIsExportingDocx(false);
    }
  };

  const saveResume = async () => {
    setSaving(true);
    try{
      const regex = /!!(.*?)!!/gs;
      const cleaned_markdown = markdown.replace(regex, (match, p1) => p1);
      await save_resume({idCreation:creation.id, resume: cleaned_markdown}).then(response=>{
        if(response.success){
          setIsSaved(true);
          setTimeout(() => setIsSaved(false), 2000);
        }
      }).catch(error=>{
        if (error.status === 500) {// token expired
          logout();
        }
      })
    }catch(error){

    }finally{
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-fit bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {creation.job_title || 'Your Resume'}
                {isProUser && <ProBadge />}
              </h2>
              <p className="text-sm text-gray-600">
                {creation.job_description ? creation.job_description.substring(0, 60) + '...' : 'No job description'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsExportOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                Export Resume
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 p-6">
          {/* Left: Resume Preview/Editor */}
          <div className="bg-white shadow-sm rounded-lg overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-6 p-2 pb-0">
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                  onClick={() => {
                    setActiveTab('preview');
                  }}
                >
                  Preview
                </button>
                <button
                  className={`px-4 py-2 font-medium flex items-center gap-1 ${activeTab === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                  onClick={() => {
                    if (isProUser) {
                      setActiveTab('editor');
                    }
                  }}
                  disabled={!isProUser}
                >
                  {!isProUser && <LockClosedIcon className="h-4 w-4" />}
                  {isProUser && <ProIco className="h-4 w-4"/>}
                  Editor
                  {!isProUser && <ProBadge />}
                </button>
              </div>

              {/* Content */}
              {activeTab === 'preview' ? (
                markdown ? (
                  <div id="resume-content" className="prose max-w-none p-8 pt-2">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={MarkdownStyle()}
                      skipHtml
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
                    <div className="flex items-center justify-between flex-wrap gap-1 p-2 bg-gray-50 border border-gray-200 rounded-t-lg">
                    <div className="flex gap-1">
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
                    <button
                      onClick={saveResume}
                      className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${isSaved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                      {isSaved ? (
                        <>
                          <CheckIcon className="h-4 w-4" />
                          Saved
                        </>
                      ) : (
                        <>
                          <DocumentTextIcon className="h-4 w-4" />
                          {saving ?
                            "Saving..."
                            :
                            "Save Resume"
                          }
                        </>
                      )}
                    </button>
                  </div>                  
                  )}

                  <textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    onKeyUp={(e) => {
                      setMarkdown(e.target.value);
                      saveState();
                      }
                    }
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
            {/* Resume Analysis Card */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <ChartBarIcon className="h-5 w-5 text-blue-600" />
                  Resume Analysis
                </h3>
                <button 
                  onClick={handleReanalyze}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                  Re-analyze
                </button>
              </div>
              
              <div className="flex items-center justify-center mb-5">
                <div className="relative">
                  <RoundedATSIndicador className={"w-24 h-24"} score={creation.ats.ats_score}/>
                </div>
              </div>

              {!isProUser ? (
                <div className="space-y-4 mb-5">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Keyword Match</span>
                      <span className="font-semibold text-gray-900"><span className='blur-sm'>00</span>%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 blur-sm"></div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Structure</span>
                      <span className="font-semibold text-gray-900"><span className='blur-sm'>00</span>%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 blur-sm"></div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">Readability</span>
                      <span className="font-semibold text-gray-900"><span className='blur-sm'>00</span>%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 blur-sm"></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-5">
                    <ProFeatureEnabled labels={labels} featureText={"Breakdown analysis enabled"}/>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">Keyword Match</span>
                        <span className="font-semibold text-gray-900">{creation.ats.breakdown.keyword_match}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${creation.ats.breakdown.keyword_match}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">Structure</span>
                        <span className="font-semibold text-gray-900">{creation.ats.breakdown.structure}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${creation.ats.breakdown.structure}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">Readability</span>
                        <span className="font-semibold text-gray-900">{creation.ats.breakdown.readability}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${creation.ats.breakdown.readability}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Optimization Tips */}
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <SparklesIcon className="h-4 w-4 text-yellow-500" />
                      Optimization Tips
                    </h4>
                    <ul className="space-y-3">
                      {creation.ats.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 mt-0.5 mr-2">
                            {tip.includes('density') ? (
                              <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </span>
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Pro CTA */}
              {!isProUser && (
                <ProTip labels={labels} text={"Get a breakdown resume analysis and personalised AI tips to improve your score to 90%+"}/>
              )}

              {/* Pro CTA */}
              {!isProUser && (
                <ProTip labels={labels} text={"Unlock all the keywords for our AI to analyse them and improve your score to 90%+"}/>
              )}
            </div>

            {/* Job Description Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold flex items-center gap-2 text-gray-800">
                  <DocumentTextIcon className="h-5 w-5 text-gray-500" />
                  Job Description
                </h3>
              </div>
              <div className="text-sm text-gray-700 max-h-60 overflow-y-auto">
                {creation.job_description || 'No job description provided'}
              </div>
            </div>

            {/* Keywords Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold mb-3 text-gray-800">Target Keywords</h3>
              <KeywordList labels={labels} isPro={isProUser} keywords={creation.keywords} />

              {/* Pro CTA */}
              {!isProUser && (
                <ProTip labels={labels} text={"Unlock all the keywords for our AI to analyse them and improve your score to 90%+"}/>
              )}
            </div>
          </div>
        </main>

        {/* Re-analyze Modal */}
        {showReanalyzeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6 animate-scale-in">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">Re-analyze Resume</h3>
                <button
                  onClick={() => setShowReanalyzeModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  This will analyze your resume again and update your score based on the current content.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Note:</span> Re-analyzing may take a few moments.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowReanalyzeModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-300"
                >
                  Cancel
                </button>
                <SubmitButton
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  loading={isLoading}
                  loadingLabel="Analyzing..."
                  label={"Re-analyze Now"}
                  cost={cost()}
                  type={"button"}
                  onClick={confirmReanalyze}
                />
              </div>
            </div>
          </div>
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
                  {isExportingPdf && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-medium">Generating PDF...</p>
                        <div className="mt-4 flex justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                          This may take a few moments...
                        </p>
                      </div>
                    </div>
                  )}
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
                  {isExportingDocx && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-medium">Generating DOCX...</p>
                        <div className="mt-4 flex justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                          This may take a few moments...
                        </p>
                      </div>
                    </div>
                  )}
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
      </motion.div>
    </div>
  );
}