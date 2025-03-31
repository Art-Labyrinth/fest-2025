import React from "react";

function ComingSoon() {
    return (
        <main className="relative flex items-center justify-center min-h-screen">
            <video className="absolute inset-0 w-full h-full object-cover" src="/artlabbackvideo.webm" autoPlay loop muted />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative text-center text-orange-400">
                <h1 className="text-4xl font-bold mb-4">Summer Festival Art-Labyrinth</h1>
                <h2 className="text-2xl font-semibold mb-4">Five Hands | 10 - 13 july 2025 | Poiana, Șoldănești</h2>
                <p className="text-lg">Сайт находится в разработке. Скоро будет доступен!</p>
                <p className="mt-4 text-sm">Следите за обновлениями.</p>
            </div>
        </main>
    );
}

export default ComingSoon;