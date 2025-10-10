
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Strategy } from '../types';
import { getStrategyInformation } from '../services/spoonacularService';
import { ChevronLeftIcon } from '../components/icons/Icons';

const TradingMode: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [strategy, setStrategy] = useState<Strategy | null>(location.state?.strategy || null);
    const [loading, setLoading] = useState(!location.state?.strategy);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const fetchStrategyIfNeeded = async () => {
            if (!strategy && id) {
                const data = await getStrategyInformation(parseInt(id, 10));
                setStrategy(data);
                setLoading(false);
            }
        };
        fetchStrategyIfNeeded();
    }, [id, strategy]);

    const steps = strategy?.executionSteps?.[0]?.steps || [];
    const totalSteps = steps.length;
    
    const goToNextStep = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        }
    };
    
    const goToPrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    if (loading) return <div className="text-center p-10">Loading execution steps...</div>;
    if (!strategy || totalSteps === 0) return <div className="text-center p-10">No execution steps available for this strategy.</div>;

    return (
        <div className="fixed inset-0 bg-white flex flex-col z-50">
            <header className="flex items-center justify-between p-4 border-b">
                <button onClick={() => navigate(`/strategy/${id}`)} className="flex items-center space-x-2 text-primary-green font-semibold">
                    <ChevronLeftIcon className="w-5 h-5" />
                    <span>Exit Trading Mode</span>
                </button>
                <div className="text-center">
                    <h1 className="font-bold text-lg">{strategy.title}</h1>
                    <p className="text-sm text-light-text">Step {currentStep + 1} of {totalSteps}</p>
                </div>
                 <div className="w-24"></div>
            </header>
            
            <div className="w-full bg-gray-200 h-2.5">
                <div className="bg-primary-green h-2.5" style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}></div>
            </div>

            <main className="flex-1 flex flex-col justify-center items-center p-6 text-center">
                <span className="text-5xl font-bold text-primary-green mb-8">{steps[currentStep].number}</span>
                <p className="text-2xl md:text-4xl max-w-3xl">
                    {steps[currentStep].step}
                </p>
            </main>

            <footer className="p-4 border-t">
                <div className="flex justify-between items-center max-w-3xl mx-auto">
                    <button 
                        onClick={goToPrevStep} 
                        disabled={currentStep === 0}
                        className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full disabled:opacity-50 transition"
                    >
                        Previous
                    </button>
                    <button 
                        onClick={goToNextStep} 
                        disabled={currentStep === totalSteps - 1}
                        className="bg-accent-orange text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 transition"
                    >
                        Next
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default TradingMode;
