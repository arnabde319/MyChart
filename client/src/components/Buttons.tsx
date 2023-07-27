import "../App.css"

const Buttons = ({func, value}: any) => {
    return (
        <button className="button" onClick={func}>{value}</button>
    )
}

export default Buttons;