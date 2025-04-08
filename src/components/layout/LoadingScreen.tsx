import { PropagateLoader } from 'react-spinners';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
            <div className="flex flex-col items-center space-y-8">
                <img
                    src="/images/DRS-BLANCO.png"
                    alt="Demo Road Show Triumph"
                    className="w-64 md:w-80 mb-4"
                />
                <PropagateLoader color="#FF0000" size={15} speedMultiplier={1} />
            </div>
        </div>
    );
};

export default LoadingScreen;