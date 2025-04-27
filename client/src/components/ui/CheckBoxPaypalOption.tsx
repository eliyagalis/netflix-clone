import React, { ChangeEvent } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import Typography from '../shared/Typography'
import { typography } from '../../data/typography'

interface CheckBoxProps{
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    isChecked: boolean,
    register: UseFormRegister<{ agreeToTerms: boolean }>,
    error:FieldError|undefined
}
const CheckBoxPaypalOption:React.FC<CheckBoxProps> = ({handleChange,isChecked=false,register,error}) => {
  
    return (
        <label className="label cursor-pointer">
            <input
            type="checkbox"
            className="checkbox rounded checkbox-neutral border-gray-400 border-1 size-7 ml-2" {...register("agreeToTerms")}
            checked={isChecked}
            onChange={(e)=>handleChange(e)}
            />
            <Typography className="label-text text-gray-400" size={typography.medium}>I agree</Typography>
            {error?.message? (<p className='text-red-700 text-xs'>{error.message}</p>):null}
        </label>
    )
}

export default CheckBoxPaypalOption
