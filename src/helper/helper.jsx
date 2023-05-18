import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export function attempts_Number(result) {
    return result.filter(r => r !== undefined).length
}

export function earnPoints_Number(result, answers, point) {
    return result.map((element, i) => answers[i] === element).filter(i => i).map(i => point).reduce((prev, curr) => prev + curr, 0)
}

export function flagResult(totalPoints, earnPoints) {
    return (totalPoints * 75 / 100) < earnPoints /* earn 75% marks */
}

export function earnPoints_Percent(totalPoints, earnPoints) {
    return (earnPoints * 100 / totalPoints).toFixed(3)
}

/* Check Company auth */
export function CheckCompanyExist({ children }) {
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}