import './Loader.css';

const Loader = (props) => {
    return(
        <div data-testid="spinner" className="spinner">
            <div className={"dot1" + (props.white ? " whiteDot" : "")}></div>
            <div className={"dot2" + (props.white ? " whiteDot" : "")}></div>
        </div>
    );
}

export default Loader;