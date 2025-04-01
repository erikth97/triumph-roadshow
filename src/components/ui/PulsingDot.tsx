interface PulsingDotProps {
    x: number;
    y: number;
    selected: boolean;
    onClick: () => void;
}

const PulsingDot = ({ x, y, selected, onClick }: PulsingDotProps) => {
    return (
        <button
            className={`absolute w-4 h-4 rounded-full z-10 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50`}
            style={{
                left: `${x}%`,
                top: `${y}%`,
                backgroundColor: selected ? 'white' : '#D11A2A',
                boxShadow: selected
                    ? '0 0 0 rgba(255, 255, 255, 0.7)'
                    : '0 0 0 rgba(209, 26, 42, 0.7)',
                animation: selected
                    ? 'none'
                    : 'pulse 1s infinite'
            }}
            onClick={onClick}
            aria-label="Seleccionar ciudad"
        >
            <span className="sr-only">Seleccionar ciudad</span>
        </button>
    );
};

export default PulsingDot;