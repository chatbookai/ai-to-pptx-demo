import { useState, useEffect, useCallback } from 'react'
import OutlineEdit from './OutlineEdit.tsx'
import { marked } from 'marked'
import { SSE } from '../utils/sse.js'
import '../styles/GenerateOutline.css'

let outline = ''
let dataUrl = ''
let outlineTree = null as any

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    async: false,
    breaks: false,
    pedantic: false,
    silent: true
})

const TestText = `# 如何使用AI来生成PPTX - PPT大纲

## 1. AI生成PPTX的基础知识

### 1.1 AI生成PPTX的定义与背景
1.1.1 定义AI生成PPTX的概念。
1.1.2 介绍AI在办公自动化中的应用背景。
1.1.3 分析PPTX格式在现代办公中的重要性。

### 1.2 AI生成PPTX的技术原理
1.2.1 介绍自然语言处理（NLP）在AI生成PPTX中的作用。
1.2.2 解释机器学习模型如何生成PPTX内容。
1.2.3 讨论AI如何处理视觉设计元素。

### 1.3 AI生成PPTX的优势与挑战
1.3.1 列举AI生成PPTX的主要优势。
1.3.2 分析AI生成PPTX面临的技术挑战。
1.3.3 讨论AI生成PPTX对传统PPT制作的影响。

## 2. 使用AI生成PPTX的实践指南

### 2.1 选择合适的AI工具
2.1.1 介绍市场上主流的AI生成PPTX工具。
2.1.2 分析各工具的功能特点与适用场景。
2.1.3 提供选择工具的评估标准。

### 2.2 输入数据与内容准备
2.2.1 解释如何准备输入数据以供AI处理。
2.2.2 讨论内容结构化的重要性。
2.2.3 提供内容准备的实用技巧。

### 2.3 AI生成PPTX的流程
2.3.1 详细描述AI生成PPTX的步骤。
2.3.2 解释如何调整和优化生成的PPTX。
2.3.3 讨论如何进行最终的审查与修改。

## 3. AI生成PPTX的未来发展

### 3.1 AI生成PPTX的技术趋势
3.1.1 预测AI生成PPTX技术的未来发展方向。
3.1.2 讨论AI与人类设计师的协作模式。
3.1.3 分析AI生成PPTX在不同行业的应用潜力。

### 3.2 用户体验与界面设计
3.2.1 探讨AI工具用户界面的设计原则。
3.2.2 分析用户体验对AI生成PPTX的影响。
3.2.3 提供优化用户体验的建议。

### 3.3 数据安全与隐私保护
3.3.1 讨论AI生成PPTX过程中的数据安全问题。
3.3.2 分析隐私保护在AI工具中的重要性。
3.3.3 提供数据安全与隐私保护的实践指南。`

function GenerateOutline({token, nextStep}: { token: string, nextStep: (params: any) => void}) {
    const [selectType, setSelectType] = useState('subject')
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    // 生成状态: 0未开始 1生成中 2已完成
    const [genStatus, setGenStatus] = useState<number>(0)
    const [outlineHtml, setOutlineHtml] = useState<string>('')

    const parseTextFromAiResult = (ParseText: string) => {
        const ParseTextArray = ParseText.split("\n")
        console.log("ParseTextArray", ParseTextArray)
        const ParseResult: any = {}
        let TitleOne = ''
        let TitleTwo = ''
        let TitleThree = ''
        let Subject = ''
        ParseTextArray.map((Item: string)=>{
            if(Item.trim() !="" && Item.trim() !="```markdown" && Item.trim() !="```")  {
                if(Item.trim().startsWith('# '))  {
                    Subject = Item.trim().substring(2)
                }
                else if(Item.trim().startsWith('## '))  {
                    TitleOne = Item.trim().substring(6)
                    ParseResult[TitleOne] = {}
                }
                else if(Item.trim().startsWith('### '))  {
                    TitleTwo = Item.trim().substring(7)
                    ParseResult[TitleOne][TitleTwo] = []
                }
                else    {
                    TitleThree = Item.trim().substring(6)
                    if(TitleOne!="" && TitleTwo!="" && TitleThree!="")   {
                        ParseResult[TitleOne][TitleTwo].push(TitleThree)
                    }
                }
            }
        })

        const ResultTopChildren: any = []
        const KeysOne = Object.keys(ParseResult)
        KeysOne.map((ItemOne: string)=>{
            const MapOne = ParseResult[ItemOne]
            const KeysTwo = Object.keys(MapOne)
            const ResultOneChildren: any = []
            KeysTwo.map((ItemTwo: string)=>{
                const MapTwo = MapOne[ItemTwo]
                const ResultTwoChildren: any = []
                MapTwo.map((ItemThree: string)=>{
                    ResultTwoChildren.push({name: ItemThree, level: 4, children: []})
                })
                const ResultTwo = {name: ItemTwo, level: 3, children: ResultTwoChildren}
                console.log("MapTwo", ItemTwo, MapTwo)
                ResultOneChildren.push(ResultTwo)
            })
            const ResultOne = {name: ItemOne, level: 2, children: ResultOneChildren}
            ResultTopChildren.push(ResultOne)
        })
        const ResultMap = {name: Subject, level: 1, children: ResultTopChildren}
        console.log("ResultMap", ResultMap)

        return ResultMap        
    }
    
    const parseFileData = useCallback((formData: FormData) => {
        const url = 'https://docmee.cn/api/ppt/parseFileData'
        const xhr = new XMLHttpRequest()
        xhr.open('POST', url, false)
        xhr.setRequestHeader('token', token)
        xhr.send(formData)
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const resp = JSON.parse(xhr.responseText)
                if (resp.code != 0) {
                    alert('解析文件异常：' + resp.message)
                    return null
                }
                return resp.data.dataUrl
            } else {
                alert('解析文件网络异常, httpStatus: ' + xhr.status)
                return null
            }
        }
    }, [token])

    const generateOutline = useCallback(() => {
        //outline = TestText
        //setGenStatus(2)
        //outlineTree = parseTextFromAiResult(TestText)
        //return 

        if (genStatus != 0) {
            return
        }
        setGenStatus(1)
        setOutlineHtml('<h3>正在生成中，请稍后....</h3>')
        const inputData = {} as any
        if (selectType == 'subject') {
            // 根据主题
            if (!subject) {
                alert('请输入主题')
                setGenStatus(0)
                return
            }
            inputData.subject = subject
        } else if (selectType == 'text') {
            // 根据内容
            if (!text) {
                alert('请输入内容')
                setGenStatus(0)
                return
            }
            const formData = new FormData()
            formData.append('content', text)
            inputData.dataUrl = parseFileData(formData)
        } else if (selectType == 'file') {
            // 根据文件
            const file = (document.getElementById('input_file') as any)?.files[0]
            if (!file) {
                alert('请选择文件')
                setGenStatus(0)
                return
            }
            const formData = new FormData()
            formData.append('file', file)
            inputData.dataUrl = parseFileData(formData)
        }
        if (!inputData.subject && !inputData.dataUrl) {
            setGenStatus(0)
            return
        }
        setGenStatus(1)
        dataUrl = inputData.dataUrl
        const url = 'http://localhost/api/aipptx/generateOutline.php'
        const source = new SSE(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'token': token
            },
            payload: JSON.stringify(inputData),
        }) as any
        source.onmessage = function (data: any) {
            if(data.data != "[DONE]")       {
                try {
                    const json = JSON.parse(data.data)
                    if(json && json.choices && json.choices[0] && json.choices[0]['delta'] && json.choices[0]['delta']['content']) {
                        console.log("json.choices[0]['delta']['content']", json.choices[0]['delta']['content'])
                        outline = outline + json.choices[0]['delta']['content']
                    }
                }
                catch(ErrorMsg: any) {
                    console.log("ErrorMsg", ErrorMsg)
                }
            }
            else {
                console.log("[DONE]outline", outline)
                outlineTree = parseTextFromAiResult(outline)
                console.log("[DONE]outlineTree", outlineTree)
                const outlineHtml = marked.parse(outline.replace('```markdown', '').replace(/```/g, '')) as string
                setOutlineHtml(outlineHtml)
            }
            //if (json.status == -1) {
                //alert('生成大纲异常：' + json.error)
                //setGenStatus(0)
                //return
            //}
            //if (json.status == 4 && json.result) {
                //outlineTree = json.result
            //}
            //outline = outline + json.text
            //const outlineHtml = marked.parse(outline.replace('```markdown', '').replace(/```/g, '')) as string
            //setOutlineHtml(outlineHtml)
        }
        source.onend = function (data: any) {
            if (data.data.startsWith('{') && data.data.endsWith('}')) {
                const json = JSON.parse(data.data)
                if (json.code != 0) {
                    alert('生成大纲异常：' + json.message)
                    setGenStatus(0)
                    return
                }
            }
            setGenStatus(2)
        }
        source.onerror = function (err: any) {
            console.error('生成大纲异常', err)
            alert('生成大纲异常')
            setGenStatus(0)
        }
        source.stream()
    }, [token, selectType, genStatus, subject, text])

    useEffect(() => {
        if (outlineHtml) {
            window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight })
        }
    }, [outlineHtml])

    useEffect(() => {
        genStatus == 2 && window.scrollTo(0, 0)
    }, [genStatus])

    return (
      <>
        <div className="outline_content">
            <h1>🤖 AI智能生成PPT演示文稿</h1>
            <div className="outline_desc">生成大纲 ---&gt; 挑选模板 --&gt; 实时生成PPT</div>
            {genStatus == 0 && <div className="input_div">
                <select defaultValue={selectType} onChange={e => setSelectType(e.target.value)}>
                    <option value="subject">根据主题</option>
                    <option value="text">根据内容</option>
                    <option value="file">根据文件</option>
                </select>
                {selectType == 'subject' && <div>
                    <input defaultValue={subject} placeholder="请输入PPT主题" maxLength={20} onBlur={e => setSubject(e.target.value)} />
                </div>}
                {selectType == 'text' && <div>
                    <textarea defaultValue={text} placeholder="请输入内容" maxLength={6000} rows={5} cols={50} onBlur={e => setText(e.target.value)} />
                </div>}
                {selectType == 'file' && <div>
                    <input id="input_file" type="file" placeholder="请选择文件" accept=".doc, .docx, .xls, .xlsx, .pdf, .ppt, .pptx, .txt" />
                </div>}
                <button onClick={generateOutline}>生成大纲</button>
            </div>}
            {genStatus == 1 && <div className="outline" dangerouslySetInnerHTML={{__html: outlineHtml}}></div>}
            {genStatus == 2 && <div>
                <button onClick={() => nextStep({ outline, dataUrl }) }>下一步：选择模板</button>
                <div className="outline_edit"><OutlineEdit outlineTree={outlineTree} update={(_outline) => { outline = _outline }} /></div>
            </div>}
        </div>
      </>
    )
}
  
export default GenerateOutline