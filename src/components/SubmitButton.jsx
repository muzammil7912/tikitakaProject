import React from 'react'

function SubmitButton({props,buttonLoading}) {
  return (
    <button  type='submit' disabled={buttonLoading ? true : false} className={props.class ? props.class : ""}>{buttonLoading ? "Submitting" : props.text}</button>
  )
}

export default SubmitButton;