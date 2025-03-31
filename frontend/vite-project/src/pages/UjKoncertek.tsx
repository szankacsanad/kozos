import { useState } from "react";
import { Koncert } from "../types/types";
import { Alert, Button, Form } from "react-bootstrap";

export default function UjKoncertek() {
    const [koncertek, setKoncertek] = useState<Koncert[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        setError(null);
        const data: FormData = new FormData(event.target as HTMLFormElement);

        try {
            const res = await fetch('http://localhost:3000/koncert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fellepo: data.get("fellepo"),
                    kezdesiIdo: new Date(data.get("kezdesiIdo") as string).toISOString(),
                    idotartam: data.get("idotartam") ? parseInt(data.get("idotartam")!.toString()) : ""
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.message || 'Nem sikeres hozzáadás');
                return;
            }

            const ujKoncert = await res.json();
            setKoncertek(prevKoncertek => [...prevKoncertek, ujKoncert]);

        } finally {
            setLoading(false);
        }
        
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Hiba történt: {error}.</p>;
    }

    return (
        <>
            <div className="container my-4">
                <div className="form">
                    <Form onSubmit={handleSubmit}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Fellépő: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Fellépő beírás"
                                name="fellepo"
                                id="fellepo"
                                required
                            />
                        </Form.Group>
    
                        <Form.Group className="mb-3">
                            <Form.Label>Kezdési idő: </Form.Label>
                            <Form.Control
                                type="datetime-local"
                                placeholder="Kezdési idő beírás"
                                name="kezdesiIdo"
                                id="kezdesiIdo"
                                required
                            />
                        </Form.Group>
    
                        <Form.Group className="mb-3">
                            <Form.Label>Időtartam: </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Időtartam beírás"
                                name="idotartam"
                                id="idotartam"
                                required
                            />
                        </Form.Group>
    
                        <Button variant="dark" type="submit" className="w-100 mt-3">
                            Hozzáadás
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
    
}