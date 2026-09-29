"use client";

import * as React from "react";
import { X, Upload, Check, Trash2, FileText, Code2, Globe, Info, ExternalLink } from "lucide-react";
import { FigmaIcon, GithubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface DesignImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: "design" | "assets" | "figma";
}

export function DesignImportModal({ isOpen, onClose }: DesignImportModalProps) {
  // Section 01: DESIGN.md paste
  const [designMdContent, setDesignMdContent] = React.useState("");

  // Section 02: 3 independent cards for file upload
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);
  const [dragOverCard, setDragOverCard] = React.useState<string | null>(null);

  // Section 03: GitHub repo
  const [githubUrl, setGithubUrl] = React.useState("");
  const [githubValid, setGithubValid] = React.useState<boolean | null>(null);

  // Section 04: Website URL
  const [websiteUrl, setWebsiteUrl] = React.useState("");
  const [websiteValid, setWebsiteValid] = React.useState<boolean | null>(null);

  // Section 05: Additional instructions
  const defaultInstructions =
    "Use the SHRIYASH SAHU black-and-white portfolio identity.\nPreserve the geometric interlocking SS logo, supplied signature, supplied profile assets, sharp edges, editorial whitespace, minimalist typography and monochrome visual system.\nAvoid gradients, unnecessary colors and generic SaaS styling.";
  const [instructions, setInstructions] = React.useState(defaultInstructions);

  // Success notification state
  const [submitted, setSubmitted] = React.useState(false);

  // Keyboard escape to close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Validate GitHub URL
  const handleGithubChange = (val: string) => {
    setGithubUrl(val);
    if (!val) {
      setGithubValid(null);
      return;
    }
    const isValid = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+/.test(val);
    setGithubValid(isValid);
  };

  // Validate Website URL
  const handleWebsiteChange = (val: string) => {
    setWebsiteUrl(val);
    if (!val) {
      setWebsiteValid(null);
      return;
    }
    const isValid = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(val);
    setWebsiteValid(isValid);
  };

  // Handle mock file uploads
  const handleSimulateUpload = (type: "design" | "assets" | "figma", filename: string, size: string) => {
    const newFile: UploadedFile = {
      id: Math.random().toString(36).substring(7),
      name: filename,
      size,
      type,
    };
    setUploadedFiles((prev) => [...prev, newFile]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Check if at least one input source is provided to enable "Continue"
  const canContinue =
    designMdContent.trim().length > 0 ||
    uploadedFiles.length > 0 ||
    (githubUrl.trim().length > 0 && githubValid === true) ||
    (websiteUrl.trim().length > 0 && websiteValid === true);

  const handleContinue = () => {
    if (!canContinue) return;
    setSubmitted(true);
    trackEvent({ name: "design_import_open" });
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-brand-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-background border border-border shadow-2xl flex flex-col overflow-hidden text-foreground"
        role="dialog"
        aria-modal="true"
        aria-labelledby="design-import-title"
      >
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-card shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                STITCH SPECIFICATION
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 border border-border">
                V1.0
              </span>
            </div>
            <h2 id="design-import-title" className="text-xl sm:text-2xl font-medium tracking-tight mt-1">
              Start with your design
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 border border-border hover:border-foreground hover:bg-foreground/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10">
          {submitted ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-12 h-12 mx-auto border border-foreground flex items-center justify-center bg-foreground text-background">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-medium tracking-tight">
                Design Specification Initialized
              </h3>
              <p className="text-sm text-muted-foreground font-mono max-w-md mx-auto">
                Your portfolio specifications and monochrome constraints have been successfully registered into the session context.
              </p>
            </div>
          ) : (
            <>
              {/* SECTION 01: Paste existing DESIGN.md */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-base font-semibold tracking-wide flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">01</span>
                    <span>Paste existing DESIGN.md</span>
                  </h3>
                  <a
                    href="https://github.com/shriyash2006/SHRIYASH-S-Portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                  >
                    <span>Learn more</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  DESIGN.md is an open-source standard document that describes the desired look and feel of your product.
                </p>
                <textarea
                  value={designMdContent}
                  onChange={(e) => setDesignMdContent(e.target.value)}
                  placeholder="Paste a DESIGN.md file here..."
                  rows={4}
                  className="w-full p-3 font-mono text-xs bg-muted/40 border border-border focus:border-foreground focus:outline-none transition-colors resize-y text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* SECTION 02: Drag and drop files (3 Independent Cards) */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold tracking-wide flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">02</span>
                  <span>Drag and drop files</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* CARD 01: Upload DESIGN.md file */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverCard("card1");
                    }}
                    onDragLeave={() => setDragOverCard(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOverCard(null);
                      handleSimulateUpload("design", "DESIGN.md", "4.2 KB");
                    }}
                    onClick={() => handleSimulateUpload("design", "DESIGN.md", "4.2 KB")}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleSimulateUpload("design", "DESIGN.md", "4.2 KB");
                      }
                    }}
                    className={cn(
                      "p-6 border border-dashed transition-all cursor-pointer flex flex-col items-center text-center justify-center min-h-[160px] group",
                      dragOverCard === "card1"
                        ? "border-foreground bg-foreground/5"
                        : "border-border hover:border-foreground/80 hover:bg-muted/40"
                    )}
                  >
                    <FileText className="w-6 h-6 mb-2 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-xs font-semibold tracking-wide">
                      Upload a DESIGN.md file
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground mt-1">
                      Drag & drop or browse
                    </span>
                  </div>

                  {/* CARD 02: Upload code, images, fonts and logos */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverCard("card2");
                    }}
                    onDragLeave={() => setDragOverCard(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOverCard(null);
                      handleSimulateUpload("assets", "portfolio-assets.zip", "8.6 MB");
                    }}
                    onClick={() => handleSimulateUpload("assets", "portfolio-assets.zip", "8.6 MB")}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleSimulateUpload("assets", "portfolio-assets.zip", "8.6 MB");
                      }
                    }}
                    className={cn(
                      "p-6 border border-dashed transition-all cursor-pointer flex flex-col items-center text-center justify-center min-h-[160px] group",
                      dragOverCard === "card2"
                        ? "border-foreground bg-foreground/5"
                        : "border-border hover:border-foreground/80 hover:bg-muted/40"
                    )}
                  >
                    <Code2 className="w-6 h-6 mb-2 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-xs font-semibold tracking-wide">
                      Upload code, images, fonts and logos
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground mt-1">
                      ZIP, PNG, SVG, OTF
                    </span>
                  </div>

                  {/* CARD 03: Upload a .fig file */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverCard("card3");
                    }}
                    onDragLeave={() => setDragOverCard(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOverCard(null);
                      handleSimulateUpload("figma", "shriyash-system.fig", "14.1 MB");
                    }}
                    onClick={() => handleSimulateUpload("figma", "shriyash-system.fig", "14.1 MB")}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleSimulateUpload("figma", "shriyash-system.fig", "14.1 MB");
                      }
                    }}
                    className={cn(
                      "p-6 border border-dashed transition-all cursor-pointer flex flex-col items-center text-center justify-center min-h-[160px] group",
                      dragOverCard === "card3"
                        ? "border-foreground bg-foreground/5"
                        : "border-border hover:border-foreground/80 hover:bg-muted/40"
                    )}
                  >
                    <FigmaIcon className="w-6 h-6 mb-2 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-xs font-semibold tracking-wide">
                      Upload a .fig file
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground mt-1">
                      Figma source document
                    </span>
                  </div>
                </div>

                {/* Uploaded items status list */}
                {uploadedFiles.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider block">
                      Uploaded files ({uploadedFiles.length})
                    </span>
                    {uploadedFiles.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between p-2.5 border border-border bg-card text-xs font-mono"
                      >
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-foreground" />
                          <span className="font-medium text-foreground">{f.name}</span>
                          <span className="text-muted-foreground">({f.size})</span>
                        </div>
                        <button
                          onClick={() => removeFile(f.id)}
                          aria-label={`Remove ${f.name}`}
                          className="p-1 hover:text-foreground text-muted-foreground transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 03: Public GitHub repository */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold tracking-wide flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">03</span>
                    <span>Public GitHub repository</span>
                  </h3>
                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 border border-border font-bold">
                    PREVIEW
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-muted-foreground">
                  <span>Or get instructions to generate a DESIGN.md from your private repo with your coding agent</span>
                  <a
                    href="https://github.com/shriyash2006/SHRIYASH-S-Portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono underline text-foreground"
                  >
                    get instructions
                  </a>
                </div>
                <div>
                  <div className="relative">
                    <GithubIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => handleGithubChange(e.target.value)}
                      placeholder="https://github.com/shriyash2006/SHRIYASH-S-Portfolio"
                      className="w-full pl-9 pr-3 py-2.5 font-mono text-xs bg-muted/40 border border-border focus:border-foreground focus:outline-none transition-colors text-foreground"
                    />
                  </div>
                  {githubValid === false && (
                    <span className="text-[11px] font-mono text-muted-foreground mt-1 block">
                      * Please provide a valid GitHub repository URL (e.g., https://github.com/owner/repo)
                    </span>
                  )}
                </div>
              </div>

              {/* SECTION 04: Add website */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold tracking-wide flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">04</span>
                  <span>Add website</span>
                </h3>
                <div>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => handleWebsiteChange(e.target.value)}
                      placeholder="https://shriyashsahu.com"
                      className="w-full pl-9 pr-3 py-2.5 font-mono text-xs bg-muted/40 border border-border focus:border-foreground focus:outline-none transition-colors text-foreground"
                    />
                  </div>
                  {websiteValid === false && (
                    <span className="text-[11px] font-mono text-muted-foreground mt-1 block">
                      * Please provide a valid HTTPS website URL (e.g., https://example.com)
                    </span>
                  )}
                </div>
              </div>

              {/* SECTION 05: Additional instructions */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold tracking-wide flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">05</span>
                  <span>Additional instructions</span>
                </h3>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={4}
                  className="w-full p-3 font-mono text-xs bg-muted/40 border border-border focus:border-foreground focus:outline-none transition-colors resize-y text-foreground"
                />
              </div>

              {/* SECTION 06: Full-width button */}
              <div className="pt-4 border-t border-border">
                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={handleContinue}
                  className={cn(
                    "w-full py-4 text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-200 border",
                    canContinue
                      ? "bg-foreground text-background border-foreground hover:bg-background hover:text-foreground cursor-pointer shadow-md"
                      : "bg-muted text-muted-foreground border-border cursor-not-allowed opacity-50"
                  )}
                >
                  ✦ Continue
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
