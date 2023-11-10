import {Link} from "react-router-dom";
import Form from "./Form";
import TestFormUI from "./TestFormUI";
import Form1 from "./Form1";
const TestForm = () => {
    const mystyle = {
        height: 100 + 'vh',
        overflowY: "scroll"
    };
    return (
        <>
            <h1>TestForm</h1>
            <TestFormUI form={<Form1/>}>
            </TestFormUI>
        </>
    )
}

export default TestForm;