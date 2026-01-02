"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Palette,
    FileCode,
    Minus,
} from "lucide-react";
import { useCallback, useEffect } from "react";

const lowlight = createLowlight(common);

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder = "Start writing..." }: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            Underline,
            TextStyle,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-500 underline cursor-pointer",
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "max-w-full rounded-lg mx-auto",
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Placeholder.configure({
                placeholder,
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:mb-1 prose-blockquote:border-l-4 prose-blockquote:border-gray-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-p:mb-3 prose-headings:mb-3 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg",
            },
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    const addLink = useCallback(() => {
        if (!editor) return;
        const url = window.prompt("Enter URL:");
        if (url) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }
    }, [editor]);

    const addImage = useCallback(() => {
        if (!editor) return;
        const url = window.prompt("Enter image URL:");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const setTextColor = useCallback(() => {
        if (!editor) return;
        const color = window.prompt("Enter color (hex or name):", "#000000");
        if (color) {
            editor.chain().focus().setColor(color).run();
        }
    }, [editor]);

    const setHighlightColor = useCallback(() => {
        if (!editor) return;
        const color = window.prompt("Enter highlight color:", "#ffff00");
        if (color) {
            editor.chain().focus().toggleHighlight({ color }).run();
        }
    }, [editor]);

    if (!editor) return null;

    const ToolButton = ({
        onClick,
        isActive = false,
        disabled = false,
        children,
        title,
    }: {
        onClick: () => void;
        isActive?: boolean;
        disabled?: boolean;
        children: React.ReactNode;
        title: string;
    }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${isActive ? "bg-gray-300 text-blue-600" : "text-gray-700"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {children}
        </button>
    );

    return (
        <div className="border rounded-xl overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
                {/* History */}
                <div className="flex gap-1 border-r pr-2 mr-1">
                    <ToolButton
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        title="Undo"
                    >
                        <Undo className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        title="Redo"
                    >
                        <Redo className="w-4 h-4" />
                    </ToolButton>
                </div>

                {/* Headings */}
                <div className="flex gap-1 border-r pr-2 mr-1">
                    <ToolButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        isActive={editor.isActive("heading", { level: 1 })}
                        title="Heading 1"
                    >
                        <Heading1 className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive("heading", { level: 2 })}
                        title="Heading 2"
                    >
                        <Heading2 className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        isActive={editor.isActive("heading", { level: 3 })}
                        title="Heading 3"
                    >
                        <Heading3 className="w-4 h-4" />
                    </ToolButton>
                </div>

                {/* Text Formatting */}
                <div className="flex gap-1 border-r pr-2 mr-1">
                    <ToolButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive("bold")}
                        title="Bold"
                    >
                        <Bold className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive("italic")}
                        title="Italic"
                    >
                        <Italic className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={editor.isActive("underline")}
                        title="Underline"
                    >
                        <UnderlineIcon className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive("strike")}
                        title="Strikethrough"
                    >
                        <Strikethrough className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        isActive={editor.isActive("code")}
                        title="Inline Code"
                    >
                        <Code className="w-4 h-4" />
                    </ToolButton>
                </div>

                {/* Colors */}
                <div className="flex gap-1 border-r pr-2 mr-1">
                    <ToolButton onClick={setTextColor} title="Text Color">
                        <Palette className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={setHighlightColor}
                        isActive={editor.isActive("highlight")}
                        title="Highlight"
                    >
                        <Highlighter className="w-4 h-4" />
                    </ToolButton>
                </div>

                {/* Alignment */}
                <div className="flex gap-1 border-r pr-2 mr-1">
                    <ToolButton
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                        isActive={editor.isActive({ textAlign: "left" })}
                        title="Align Left"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                        isActive={editor.isActive({ textAlign: "center" })}
                        title="Align Center"
                    >
                        <AlignCenter className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                        isActive={editor.isActive({ textAlign: "right" })}
                        title="Align Right"
                    >
                        <AlignRight className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                        isActive={editor.isActive({ textAlign: "justify" })}
                        title="Justify"
                    >
                        <AlignJustify className="w-4 h-4" />
                    </ToolButton>
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r pr-2 mr-1">
                    <ToolButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive("bulletList")}
                        title="Bullet List"
                    >
                        <List className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive("orderedList")}
                        title="Numbered List"
                    >
                        <ListOrdered className="w-4 h-4" />
                    </ToolButton>
                </div>

                {/* Block Elements */}
                <div className="flex gap-1 border-r pr-2 mr-1">
                    <ToolButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive("blockquote")}
                        title="Quote"
                    >
                        <Quote className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        isActive={editor.isActive("codeBlock")}
                        title="Code Block"
                    >
                        <FileCode className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        title="Horizontal Rule"
                    >
                        <Minus className="w-4 h-4" />
                    </ToolButton>
                </div>

                {/* Links & Media */}
                <div className="flex gap-1">
                    <ToolButton
                        onClick={addLink}
                        isActive={editor.isActive("link")}
                        title="Add Link"
                    >
                        <LinkIcon className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton onClick={addImage} title="Add Image">
                        <ImageIcon className="w-4 h-4" />
                    </ToolButton>
                </div>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} />
        </div>
    );
}
