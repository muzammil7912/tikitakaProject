import FileDocument from "./FileDocument";
import Input from "./Input";
import Input2 from "./Input2";
import Password from "./Password";
import Select from "./Select";
import Select2 from "./Select2";
import Textarea from "./Textarea";
import Textarea2 from "./Textarea2";
function FormControl(props) {
    const type = {
        "input" : <Input {...props} />,
        "input2" : <Input2 {...props} />,
        "password" : <Password {...props} />,
        "select" : <Select {...props} />,
        "select2" : <Select2 {...props} />,
        "textarea" : <Textarea {...props} />,
        "textarea2" : <Textarea2 {...props} />,
        "FileDoument" : <FileDocument {...props} />
    };
    return type[props.control] ?? "";
}

export default FormControl;