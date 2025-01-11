import { useState } from 'react'
import GenerateOutline from './GenerateOutline.tsx'
import SelectTemplate from './SelectTemplate.tsx'
import GeneratePpt from './GeneratePpt.tsx'

function AiPpt() {
  const [step, setStep] = useState(1)
  const [outline, setOutline] = useState('')
  const [dataUrl, setDataUrl] = useState()
  const [templateId, setTemplateId] = useState('')
  const token = ''

  return (
    <>
      <div>
        {step == 1 && (
            <GenerateOutline token={token} nextStep={(params)=> {
                setStep(step => step + 1)
                setOutline(() => params.outline)
                setDataUrl(() => params.dataUrl)
            }} />
        )}
        {step == 2 && (
            <SelectTemplate token={token} nextStep={(id)=> {
                setStep(step => step + 1)
                setTemplateId(() => id)
            }} />
        )}
        {step == 3 && (
            <GeneratePpt token={token} params={{templateId, outline, dataUrl}} nextStep={(id)=> {
              setTemplateId(() => id)
          }}  />
        )}
      </div>
    </>
  )
}

export default AiPpt
