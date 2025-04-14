import React from 'react';

export default function MarkdownStyle() {
  // Custom component for highlighted text
  const HighlightedText = React.memo(({ children, depth = 0 }) => {

    if (depth > 3) {
      console.warn('HighlightedText recursion depth exceeded');
      return children;
    }
    
    if (Array.isArray(children)) {
      return React.Children.map(children, (child, i) => (
        <HighlightedText key={i} depth={depth + 1}>
          {child}
        </HighlightedText>
      ));
    }

    if (typeof children !== 'string') {
      return children;
    }

    const regex = /!!(.*?)!!/gs;
    const output = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(children)) !== null) {
      if (match.index > lastIndex) {
        output.push(children.slice(lastIndex, match.index));
      }

      output.push(
        <mark 
          key={match.index} 
          style={{
            background: "rgba(144, 182, 212, 0.5)",
            borderRadius: '0.375rem',
            padding: '0 0.25rem',
            display: 'inline-block',
            lineHeight: '1.5'
          }}
        >
          {match[1]}
        </mark>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < children.length) {
      output.push(children.slice(lastIndex));
    }

    return <>{output}</>;
  });

  const ui = {
    // Root container
    root: ({ node, ...props }) => (
      <div style={{
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        color: '#374151',
        lineHeight: '1.5'
      }}>
        {props.children}
      </div>
    ),
  
    // Text containers
    p: ({ node, ...props }) => (
      <p style={{
        marginBottom: '0.75rem',
        fontSize: '13pt',
        lineHeight: '1.4'
      }}>
        <HighlightedText {...props} />
      </p>
    ),
  
    // Headings (ATS-safe styling)
    h1: ({ node, ...props }) => (
      <h1 style={{
        fontSize: '22pt',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#111827',
        borderBottom: '1px solid #d1d5db',
        paddingBottom: '0.5rem'
      }}>
        <HighlightedText {...props} />
      </h1>
    ),
    
    h2: ({ node, ...props }) => (
      <h2 style={{
        fontSize: '16pt',
        fontWeight: 'bold',
        marginTop: '1.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        <HighlightedText {...props} />
      </h2>
    ),
    
    h3: ({ node, ...props }) => (
      <h3 style={{
        fontSize: '14pt',
        fontWeight: '600',
        marginTop: '1.25rem',
        marginBottom: '0.5rem',
        color: '#374151'
      }}>
        <HighlightedText {...props} />
      </h3>
    ),
  
    // Lists (optimized for parsing)
    ul: ({ node, ...props }) => (
      <ul style={{
        listStyleType: 'disc',
        paddingLeft: '1.25rem',
        marginBottom: '1rem'
      }}>
        <HighlightedText {...props} />
      </ul>
    ),
    
    ol: ({ node, ...props }) => (
      <ol style={{
        listStyleType: 'decimal',
        paddingLeft: '1.25rem',
        marginBottom: '1rem'
      }}>
        <HighlightedText {...props} />
      </ol>
    ),
    
    li: ({ node, ...props }) => (
      <li style={{
        marginBottom: '0.25rem',
        fontSize: '12pt'
      }}>
        <HighlightedText {...props} />
      </li>
    ),
  
    // Tables (ATS-compatible structure)
    table: ({ node, ...props }) => (
      <div style={{
        marginBottom: '1.25rem',
        overflowX: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <HighlightedText {...props} />
        </table>
      </div>
    ),
    
    thead: ({ node, ...props }) => (
      <thead style={{
        backgroundColor: '#f3f4f6'
      }}>
       <HighlightedText {...props} />
      </thead>
    ),
    
    tbody: ({ node, ...props }) => (
      <tbody>
       <HighlightedText {...props} />
      </tbody>
    ),
    
    tr: ({ node, ...props }) => (
      <tr>
       <HighlightedText {...props} />
      </tr>
    ),
    
    th: ({ node, ...props }) => (
      <th style={{
        textAlign: 'left',
        padding: '0.5rem',
        borderBottom: '1px solid #d1d5db',
        fontWeight: '600',
        fontSize: '12pt'
      }}>
        <HighlightedText {...props} />
      </th>
    ),
    
    td: ({ node, ...props }) => (
      <td style={{
        padding: '0.5rem',
        borderBottom: '1px solid #e5e7eb',
        fontSize: '12pt'
      }}>
        <HighlightedText {...props} />
      </td>
    ),
  
    // Special formatting
    strong: ({ node, ...props }) => (
      <strong style={{
        fontWeight: '600'
      }}>
       <HighlightedText {...props} />
      </strong>
    ),
    
    em: ({ node, ...props }) => (
      <em style={{
        fontStyle: 'italic'
      }}>
        <HighlightedText {...props} />
      </em>
    ),
  
    a: ({ node, ...props }) => (
      <span style={{
        color: '#1d4ed8'
      }}>
        {props.children}
      </span>
    ),
  
    // Horizontal rule
    hr: ({ node, ...props }) => (
      <hr style={{
        margin: '1.25rem 0',
        borderTop: '1px solid #d1d5db',
        borderBottom: 'none',
        borderLeft: 'none',
        borderRight: 'none'
      }} />
    ),
  
    // Inline code
    code: ({ node, inline, ...props }) => (
      <code style={{
        backgroundColor: '#f3f4f6',
        padding: '0.125rem 0.25rem',
        borderRadius: '0.25rem',
        fontSize: '11pt',
        fontFamily: 'monospace'
      }}>
        <HighlightedText {...props} />
      </code>
    ),
  
    // Text processor with highlighting
    text: ({ node, ...props }) => {
      if (typeof props.children === 'string') {
        return <HighlightedText>{props.children}</HighlightedText>;
      }
      return props.children;
    },
  };

  return ui;
}