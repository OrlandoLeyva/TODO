import checkIcon from '/src/assets/images/icon-check.svg'
import crossIcon from '/src/assets/images/icon-cross.svg'

/* eslint-disable react/prop-types */
export default function Todo(props){
    const {value, status, id} = props.data.item
    const {removeTodo,toggleStatus} = props.data

    function remove(){
        removeTodo(id)
    }

    function changeStatus() {
        toggleStatus(id)
    }
    
    return (
        <div className={`todo-item-container todo-item ${status == 'complete' ? 'complete' : ''}`}>
            <div className="check-container" onClick={changeStatus}>
                {status == 'complete' && <img src={checkIcon} alt="check icon" />}
            </div>
            <p style={{}}>{value}</p>
            <img src={crossIcon} alt="cross icon" className='cross-icon' onClick={remove}/>
        </div>
    )
}