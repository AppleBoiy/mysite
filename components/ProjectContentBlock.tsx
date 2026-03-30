'use client';

import Image from 'next/image';
import { Terminal } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { ContentBlock } from '@/data/projects';

interface ProjectContentBlockProps {
  block: ContentBlock;
}

export default function ProjectContentBlock({ block }: ProjectContentBlockProps) {
  switch (block.type) {
    case 'text':
      return (
        <p className="text-muted-foreground leading-relaxed">
          {block.content}
        </p>
      );

    case 'code':
      return (
        <div className="rounded-xl overflow-hidden border border-border">
          {block.filename && (
            <div className="px-4 py-2 bg-muted border-b border-border text-sm text-muted-foreground font-mono">
              {block.filename}
            </div>
          )}
          <SyntaxHighlighter
            language={block.language || 'text'}
            style={oneDark}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: '0.875rem',
            }}
            showLineNumbers
          >
            {block.code || ''}
          </SyntaxHighlighter>
        </div>
      );

    case 'terminal':
      return (
        <div className="rounded-xl overflow-hidden border border-border bg-black text-green-400">
          {block.command && (
            <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
              <Terminal size={16} />
              <span className="font-mono text-sm">$ {block.command}</span>
            </div>
          )}
          {block.output && (
            <pre className="p-4 overflow-x-auto font-mono text-sm whitespace-pre-wrap">
              {block.output}
            </pre>
          )}
        </div>
      );

    case 'image':
      return (
        <figure className="space-y-3">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted">
            <Image
              src={block.src || ''}
              alt={block.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {block.caption && (
            <figcaption className="text-sm text-muted-foreground text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'images':
      return (
        <div className="grid sm:grid-cols-2 gap-6">
          {block.images?.map((img, i) => (
            <figure key={i} className="space-y-3">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
              {img.caption && (
                <figcaption className="text-sm text-muted-foreground text-center">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      );

    case 'video':
      return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted">
          <video
            src={block.videoUrl}
            controls
            className="w-full h-full"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );

    default:
      return null;
  }
}
