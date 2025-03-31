import { useEffect, useState } from "react";
import { Koncert } from "../types/types";
import { Button, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Main() {
    const [koncertek, setKoncertek] = useState<Koncert[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchKoncert = async () => {
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
    useEffect(() => {
        fetchKoncert();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Hiba történt: {error}.</p>;
    }

    async function elmaradEFunction(id: number) {
        const result = await fetch("http://localhost:3000/koncert/" + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ elmaradE: true })
        });

        if (result.ok) {
            setKoncertek((prevConserts) =>
                prevConserts.map(k =>
                    k.id === id ? { ...k, elmaradE: true } : k
                )
            );
        } else {
            console.log(await result.text());
        }
    }

    return (
        <>
            <main className="container">
                <div className="row">
                    {koncertek.map((koncert) => (
                        <div key={koncert.id} className="col-md-4 d-flex">
                            <div className="card shadow-sm h-100 w-100">
                                <div className="card-body text-center">
                                    <h3 className="card-title fw-bold text-warning">
                                        {koncert.fellepo}
                                    </h3>
                                    <p className="card-text text-muted">
                                        <strong>Kezdési idő:</strong> {koncert.kezdesiIdo}
                                        <br />
                                        <strong>Időtartam:</strong> {koncert.idotartam}
                                        <br />
                                        <span className={koncert.elmaradE ? "text-danger fw-bold" : "text-success fw-bold"}>
                                            {koncert.elmaradE ? "Elmarad" : "Nem marad el"}
                                        </span>
                                        <Button
                                            variant={koncert.elmaradE ? "secondary" : "danger"}
                                            size="sm"
                                            className="ms-2"
                                            onClick={() => elmaradEFunction(koncert.id)}
                                            disabled={koncert.elmaradE}
                                        >
                                            Elmarad
                                        </Button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

        </>
    )
}