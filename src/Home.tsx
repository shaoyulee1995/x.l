import React from 'react';
import ProblemList from './component/ProblemList';

const Home: React.FC = () => {
    return (
        <div>
            <ProblemList onSelect={() => {}} /> {/* Pass an empty function for onSelect */}
        </div>
    );
};

export default Home;
