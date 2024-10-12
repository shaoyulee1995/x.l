import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProblemDetailProps {
    problem: {
        name: string;
        download_url: string;
    };
    onBack: () => void;
}

const ProblemDetail: React.FC<ProblemDetailProps> = ({ problem, onBack }) => {
    const [readmeContent, setReadmeContent] = useState<string>('');

    useEffect(() => {
        const fetchReadme = async () => {
            const response = await axios.get(problem.download_url);
            setReadmeContent(response.data);
        };
        fetchReadme();
    }, [problem]);

    return (
        <div className="problem-detail">
            <button onClick={onBack}>Back</button>
            <h2>{problem.name}</h2>
            <pre>{readmeContent}</pre>
        </div>
    );
};

export default ProblemDetail;