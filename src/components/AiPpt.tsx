import { useState } from 'react'
import GenerateOutline from './GenerateOutline.tsx'
import SelectTemplate from './SelectTemplate.tsx'
import GeneratePpt from './GeneratePpt.tsx'

// api key
const apiKey = 'ak_64m31P5v3v6r5AMWBI'
const uid = 'test1'


function AiPpt() {
  const [step, setStep] = useState(1)
  const [outline, setOutline] = useState('')
  const [dataUrl, setDataUrl] = useState()
  const [templateId, setTemplateId] = useState('')
  const [token, setToken] = useState('')

  async function createApiToken() {
    if (!apiKey) {
      alert('请在代码中设置apiKey')
      return
    }
    const url = 'https://fdzz.dandian.net/api/createApiToken'
    const resp = await (await fetch(url, {
      method: 'POST',
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid,
        limit: null
      })
    })).json()
    if (resp.code != 0) {
      alert('创建接口token异常：' + resp.message)
      return
    }
    setToken(resp.data.token)
  }

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
            <GeneratePpt token={token} params={{templateId, outline, dataUrl}} />
        )}
      </div>
    </>
  )
}

export default AiPpt
