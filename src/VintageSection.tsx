import React from 'react';
import './VintageSection.css';

interface VintageSectionProps {
    children: React.ReactNode;
}

const VintageSection: React.FC<VintageSectionProps> = ({ children }) => {
    return (
        <section className="vintage-paragraph">
            <div className="vintage-text">
                {children}
            </div>
        </section>
    );
};

export default VintageSection;
