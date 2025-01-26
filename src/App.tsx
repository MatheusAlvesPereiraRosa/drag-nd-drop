import { useState, DragEvent } from "react";


type Item = {
    id: string;
    content: string;
};

function App() {
    const [items, setItems] = useState<Item[]>([
        { id: "1", content: "Item 1" },
        { id: "2", content: "Item 2" },
        { id: "3", content: "Item 3" },
        { id: "4", content: "Item 4" },
        { id: "5", content: "Item 5" },
    ]);

    const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

    const handleDragStart = (id: string) => {
        setDraggedItemId(id);
        
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (id: string) => {
        if (draggedItemId === null || draggedItemId === id) return;

        const sourceIndex = items.findIndex((item) => item.id === draggedItemId);
        const targetIndex = items.findIndex((item) => item.id === id);

        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(sourceIndex, 1);
        updatedItems.splice(targetIndex, 0, movedItem);

        setItems(updatedItems);
        setDraggedItemId(null);
    };

    return (
        <main className="w-full h-[100vh] flex justify-center items-center">
            <div className="grid grid-cols-3 gap-4 p-4 border rounded">
                {items.map((item) => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item.id)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(item.id)}
                        className={`bg-blue-500 text-white p-4 rounded shadow cursor-pointer ${draggedItemId === item.id ? "opacity-100" : ""
                            }`}
                        style={{ opacity: draggedItemId === item.id ? "1" : "inherit" }}
                    >
                        {item.content}
                    </div>
                ))}
            </div>
        </main>
    );
}

export default App;
