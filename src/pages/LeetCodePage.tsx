import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './css/LeetCodePage.css'; // Import CSS for styling

interface Problem {
    name: string;
    folder: string; // Folder name for the problem
}

const LeetCodePage: React.FC = () => {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [displayedProblems, setDisplayedProblems] = useState<Problem[]>([]);
    const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
    const [readmeContent, setReadmeContent] = useState<string>('');
    const [loadCount, setLoadCount] = useState(20); // Number of problems to display initially

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get('https://api.github.com/repos/shaoyulee1995/Problems/contents/LeetCode');
                const problemList = response.data
                    .filter((item: any) => item.type === 'dir') // Filter for directories
                    .map((item: any) => ({
                        name: item.name, // Use the folder name as the problem name
                        folder: item.name // The folder name for constructing the README URL
                    }));
                setProblems(problemList);
                setDisplayedProblems(problemList.slice(0, loadCount)); // Display the first 20 problems
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };
        fetchProblems();
    }, []);

    const handleSelectProblem = async (problem: Problem) => {
        setSelectedProblem(problem);
        const readmeUrl = `https://raw.githubusercontent.com/shaoyulee1995/Problems/main/LeetCode/${problem.folder}/README.md`;
        try {
            const response = await axios.get(readmeUrl);
            setReadmeContent(response.data);
        } catch (error) {
            console.error('Error fetching README:', error);
        }
    };

    const loadMoreProblems = useCallback(() => {
        const nextLoadCount = loadCount + 20; // Load 20 more problems
        setLoadCount(nextLoadCount);
        setDisplayedProblems(problems.slice(0, nextLoadCount)); // Update displayed problems
    }, [loadCount, problems]);

    useEffect(() => {
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
            if (bottom) {
                loadMoreProblems();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loadMoreProblems]);

    return (
        <div className="leetcode-page">
            <div className="problem-list">
                <h2>LeetCode Problems</h2>
                <div className="problem-items">
                    {displayedProblems.map(problem => (
                        <button 
                            key={problem.name} 
                            className="problem-button" 
                            onClick={() => handleSelectProblem(problem)}
                        >
                            {problem.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="problem-detail">
                {selectedProblem ? (
                    <>
                        <h2>{selectedProblem.name}</h2>
                        <pre>{readmeContent}</pre>
                    </>
                ) : (
                    <p>Select a problem to see the solution.</p>
                )}
            </div>
        </div>
    );
};

export default LeetCodePage;