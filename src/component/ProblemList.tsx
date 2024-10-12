import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LEETCODE_URL } from '../constants/Urls';

interface Problem {
    name: string;
    download_url: string;
}

interface ProblemListProps {
    onSelect: (problem: Problem) => void;
}

const ProblemList: React.FC<ProblemListProps> = ({ onSelect }) => {
    const [problems, setProblems] = useState<Problem[]>([]);

    useEffect(() => {
        const fetchProblems = async () => {
            const response = await axios.get(LEETCODE_URL);
            setProblems(response.data);
        };
        fetchProblems();
    }, []);

    return (
        <ul className="problem-list">
            {problems.map(problem => (
                <li key={problem.name}>
                    <button onClick={() => onSelect(problem)}>{problem.name}</button>
                </li>
            ))}
        </ul>
    );
};

export default ProblemList;