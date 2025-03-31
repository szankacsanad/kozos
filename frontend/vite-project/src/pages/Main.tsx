import { useState } from "react";
import { Koncert } from "../types/types";

export default function Home() {
    const [koncertek, setKoncertek] = useState<Koncert[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchKoncert= async () => {
        setLoading(true);
        setError(null);
        
        await fetch(`http://localhost:3000/koncert`)
            .then((response) => {
                if (response.status === 404) {
                    setError("A kért erőforrás nem található (404)!");
                }
                if (!response.ok) {
                    setError(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setKoncertek(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
            });
}
}