const PetriDish = ({imgFront, imgBack, imgOverlay, overlayPosition, isActive}) => {
    return (
        <>
            <img src={imgOverlay} className={`mold-overlay ${isActive ? "petri-active" : ""}`} style={overlayPosition} />
            <div className="petri-dish-inner">
                <div className="petri-front">
                    <img src={imgFront} alt="Petri dish plate" className="petri-img" style={{ borderRadius: '50%' }} />
                </div>
                <div className="petri-side"></div>
                <div className="petri-back">
                    <img src={imgBack} alt="Petri dish plate" className="petri-img" style={{ position: 'absolute', borderRadius: '50%' }} />
                </div>
            </div>
        </>
    );
};

export default PetriDish;