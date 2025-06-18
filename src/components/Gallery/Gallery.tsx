import React, { useRef, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";

const verticalPhotos = [
    3, 4, 5, 6, 9, 11, 15, 18,
    20, 26, 29, 31, 39, 41, 42, 44, 47, 48,
    52, 54, 61, 67, 68
];
const horizontalPhotos = [
    1, 2, 7, 8, 10, 12, 13, 14, 16, 17, 19,
    21, 22, 23, 24, 25, 27, 28,
    30, 32, 33, 34, 35, 36, 37, 38,
    40, 43, 45, 46, 49,
    50, 51, 53, 55, 56, 57, 58, 59,
    60, 62, 63, 64, 65, 66
];

function chunkArray<T>(arr: T[], size: number): T[][] {
    const res: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        res.push(arr.slice(i, i + size));
    }
    return res;
}

function useColumnsCount() {
    const [columns, setColumns] = useState(3);
    useEffect(() => {
        function update() {
            if (window.innerWidth < 600) setColumns(1);
            else if (window.innerWidth < 1200) setColumns(2);
            else setColumns(3);
        }
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);
    return columns;
}

function getPhotoSrcSet(photoNum: number) {
    const numStr = photoNum.toString().padStart(4, "0");
    return [
        `https://files.art-labyrinth.org/fest2025/gallery/sm_gallery_${numStr}.webp 320w`,
        `https://files.art-labyrinth.org/fest2025/gallery/md_gallery_${numStr}.webp 480w`,
        `https://files.art-labyrinth.org/fest2025/gallery/lg_gallery_${numStr}.webp 800w`,
        `https://files.art-labyrinth.org/fest2025/gallery/xl_gallery_${numStr}.webp 1200w`,
        `https://files.art-labyrinth.org/fest2025/gallery/2xl_gallery_${numStr}.webp 1600w`,

    ].join(", ");
}

function getPhotoSrc(photoNum: number) {
    const numStr = photoNum.toString().padStart(4, "0");
    return `https://files.art-labyrinth.org/fest2025/gallery/sm_gallery_${numStr}.webp`;
}

function LazyImage({
    src,
    srcSet,
    sizes,
    alt,
    ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
    srcSet?: string;
    sizes?: string;
}) {
    const ref = useRef<HTMLImageElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        if (visible) return;

        const observer = new window.IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );
        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [visible]);

    return (
        <img
            ref={ref}
            src={visible ? src : undefined}
            srcSet={visible ? srcSet : undefined}
            sizes={visible ? sizes : undefined}
            alt={alt}
            loading="lazy"
            style={{
                width: "100%",
                height: "auto",
                display: "block",
            }}
            {...props}
        />
    );
}

export default function Gallery() {
    const columns = useColumnsCount();
    const verticalColumns = columns >= 3 ? (columns + 2) : columns === 2 ? columns + 1 : columns;

    const verticalRows = chunkArray(verticalPhotos, verticalColumns);
    const horizontalRows = chunkArray(horizontalPhotos, columns);

    let lastVerticalRow: number[] | undefined = undefined;
    let mainVerticalRows = verticalRows;
    if (verticalRows.length && verticalRows[verticalRows.length - 1].length < verticalColumns) {
        lastVerticalRow = verticalRows[verticalRows.length - 1];
        mainVerticalRows = verticalRows.slice(0, -1);
    }

    const rows: { type: "vertical" | "horizontal"; photos: number[] }[] = [];
    let h = 0, v = 0;
    while (h < horizontalRows.length || v < mainVerticalRows.length) {
        if (h < horizontalRows.length) rows.push({ type: "horizontal", photos: horizontalRows[h++] });
        if (h < horizontalRows.length) rows.push({ type: "horizontal", photos: horizontalRows[h++] });
        if (v < mainVerticalRows.length) rows.push({ type: "vertical", photos: mainVerticalRows[v++] });
    }
    if (lastVerticalRow) {
        rows.push({ type: "vertical", photos: lastVerticalRow });
    }

    return (
        <div className="gallery bg-[#F4E4C3]">
            <div className="bg-main">
                <Header />
            </div>
            <div className="p-10 max-w-7xl mx-auto">
                {rows.map((row, rowIdx) => (
                    <div
                        className="gallery-row"
                        key={rowIdx}
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                row.type === "vertical"
                                    ? `repeat(${verticalColumns}, 1fr)`
                                    : `repeat(${columns}, 1fr)`,
                            gap: 16,
                            marginBottom: 24,
                        }}
                    >
                        {row.photos.map((num) => (
                            <picture key={num} style={{ aspectRatio: row.type === "vertical" ? "3/4" : "4/3" }}>
                                <source
                                    type="image/webp"
                                    srcSet={getPhotoSrcSet(num)}
                                    sizes={
                                        row.type === "vertical"
                                            ? "(max-width: 600px) 320px, (max-width: 1200px) 320px, 480px"
                                            : "(max-width: 600px) 320px, (max-width: 1200px) 480px, 800px"
                                    }
                                />
                                <LazyImage
                                    src={getPhotoSrc(num)}
                                    srcSet={getPhotoSrcSet(num)}
                                    sizes={
                                        row.type === "vertical"
                                            ? "(max-width: 600px) 320px, (max-width: 1200px) 320px, 480px"
                                            : "(max-width: 600px) 320px, (max-width: 1200px) 480px, 800px"
                                    }
                                    alt={`№${num}`}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        display: "block",
                                        aspectRatio: row.type === "vertical" ? "3/4" : "4/3"
                                    }}
                                />
                            </picture>
                        ))}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
