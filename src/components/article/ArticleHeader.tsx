import React from "react";
import {
  UniformText,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import Image from "next/image";
import { imageFrom } from "@uniformdev/assets";
import type { AssetParamValue } from "@uniformdev/assets";
import { Calendar } from "lucide-react";

export interface ArticleHeaderProps {
  className?: string;
  category?: string;
  publishedDate?: string;
  readingTime?: string;
  authorName?: string;
  featuredImage?: AssetParamValue;
  excerpt?: string;
}

/**
 * ArticleHeader Component
 * 
 * Displays the main header section of an article matching the new blog design.
 * Includes category badge, title, metadata, hero image, and excerpt.
 * 
 * Features:
 * - Category badge with secondary styling
 * - Large, readable title with responsive sizing
 * - Published date with calendar icon
 * - Hero image with 1200x630 aspect ratio
 * - Excerpt/lede as large text paragraph
 * - Clean, modern typography matching the design system
 * - Responsive design with proper spacing
 * 
 * Image Features:
 * - 1200x630 aspect ratio optimized for article headers
 * - Smart cropping with "cover" fit
 * - Responsive image loading with proper sizes
 * - Fallback placeholder when no image selected
 * - Accessibility with proper alt text extraction
 * 
 * Uniform Integration:
 * - Uses UniformText for the article title and excerpt
 * - Uses AssetParamValue for featured image with imageFrom transformations
 * - Supports category, date, reading time parameters
 */
export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  className = "",
  category,
  publishedDate,
  readingTime,
  authorName,
  featuredImage,
  excerpt,
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatReadingTime = (time: string | number | undefined) => {
    if (!time) return '';
    if (typeof time === 'number') {
      return `${time} min read`;
    }
    return time;
  };

  // Process the Uniform featured image asset parameter
  const imageAssets = featuredImage ?? [];
  const [firstAsset] = imageAssets;
  
  // Generate optimized image URL for featured image
  const imageUrl = firstAsset
    ? imageFrom(firstAsset)
        .transform({ 
          width: 1200,   // High resolution for featured images
          height: 600,   // 2:1 aspect ratio
          fit: "cover",   // Smart crop to maintain aspect ratio
          focal: firstAsset.fields?.focalPoint?.value || "center" // Focal point support for precise positioning
        })
        .url()
    : undefined;

  // Extract alt text for accessibility
  const imageAlt = firstAsset?.fields?.description?.value || 
                  firstAsset?.fields?.title?.value || 
                  'Article featured image';

  return (
    <header className={`mx-auto max-w-3xl px-6 py-12 md:py-16 space-y-6 ${className}`}>
      {/* Category Badge */}
      {category && (
        <div className="inline-flex items-center gap-2">
          <span className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
            {category}
          </span>
        </div>
      )}

      {/* Article Title */}
      <h1 className="text-4xl font-medium tracking-tight text-balance md:text-5xl lg:text-6xl leading-[1.1]">
        <UniformText 
          parameterId="title" 
          placeholder="Article title goes here" 
        />
      </h1>

      {/* Meta Info */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        {publishedDate && (
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatDate(publishedDate)}
          </div>
        )}
        {readingTime && (
          <span>{formatReadingTime(readingTime)}</span>
        )}
      </div>

      {/* Hero Image */}
      {imageUrl && (
        <div className="!mt-8 overflow-hidden rounded-lg">
          <div className="relative w-full aspect-[1200/630] bg-muted">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </div>
      )}

      {/* Image Placeholder when no image selected */}
      {!imageUrl && (
        <div className="!mt-8 overflow-hidden rounded-lg bg-muted/30 border border-border/50">
          <div className="aspect-[1200/630] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm">Select featured image in the panel →</p>
            </div>
          </div>
        </div>
      )}

      {/* Excerpt/Lede */}
      {excerpt && (
        <p className="!mt-8 text-xl leading-relaxed text-muted-foreground text-pretty">
          {excerpt}
        </p>
      )}
      {!excerpt && (
        <div className="!mt-8">
          <UniformText
            parameterId="excerpt"
            placeholder="Article excerpt goes here..."
            as="p"
            className="text-xl leading-relaxed text-muted-foreground text-pretty"
          />
        </div>
      )}
    </header>
  );
};

// Register with Uniform
registerUniformComponent({
  type: "articleHeader",
  component: ArticleHeader,
});

export default ArticleHeader;
