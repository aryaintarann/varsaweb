"use client";

interface SectionTransitionProps {
    fromColor: string;
    toColor: string;
    position?: "top" | "bottom";
    height?: string;
}

export function SectionTransition({
    fromColor,
    toColor,
    position = "bottom",
    height = "80px"
}: SectionTransitionProps) {
    const gradientDirection = position === "bottom" ? "to bottom" : "to top";

    return (
        <div
            className="w-full pointer-events-none"
            style={{
                height,
                background: `linear-gradient(${gradientDirection}, ${fromColor}, ${toColor})`,
                marginTop: position === "bottom" ? `-${height}` : "0",
                marginBottom: position === "top" ? `-${height}` : "0",
                position: "relative",
                zIndex: 1,
            }}
        />
    );
}
