import style from './spinner.module.css'

const Spinner = () => {
  return (
    <div className={style.semipolarSpinner}>
      <div className={style.ring}></div>
      <div className={style.ring}></div>
      <div className={style.ring}></div>
      <div className={style.ring}></div>
      <div className={style.ring}></div>
    </div>
  )
}

export default Spinner
