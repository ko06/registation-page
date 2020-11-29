import React from 'react'
import { Form, Input, Button, Checkbox, Upload, Icon, message, InputNumber } from 'antd';

function normFile(e) {
    console.log('Upload event:', e);   
     const isJPG = e.file.type === 'image/jpeg';
     if (!isJPG) {
         return null;
     }
    return e.file;
};

const uploadButton = (
    <div>
        <Icon type={'plus'} />
        <div className="ant-upload-text">Upload</div>
    </div>
);

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}


const StepTwo = Form.create({
    name: 'step_two'
})(props => {
    const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
    const validateInput = (e) => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                props.submittedValues(values);
                props.handleNextButton();
            }
        });
    }
    const storeValues = () => {
        const values = getFieldsValue();
        props.submittedValues(values);
        props.handleBackButton();
    }
    return (
        <Form onSubmit={validateInput}>
            <Form.Item className={'upload-container'} label="Upload your company logo">
                {getFieldDecorator('upload', {
                    valuePropName: 'file',
                    getValueFromEvent: normFile,
                    rules: [
                        {
                            required: true, message: 'Please update your logo!'
                        }
                    ]
                })(
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://run.mocky.io/v3/bdbb5dde-23b2-4d32-ab39-d7ec59f0d760"
                        beforeUpload={beforeUpload}
                        onChange={(e) => props.handleImageChange(e)}
                    >
                    {props.imageUrl ? <img src={props.imageUrl} alt="avatar" style={{ width: '75%' }} /> : uploadButton}
                    </Upload>,
                )}
            </Form.Item>
            <Form.Item label="Company Name">
                {getFieldDecorator('comapany_name', {
                    rules: [{ required: true, message: 'Cannot be empty!' }],
                    initialValue: props.comapany_name
                })(<Input placeholder="Input your value here" />)}
            </Form.Item>
            <Form.Item label="Email id">
                {getFieldDecorator('email_id', {
                    rules: [{
                        required: true, 
                        message: 'Cannot be empty'},{
                        type: "email",
                        message: "The input is not valid E-mail!"
                    }],
                    initialValue: props.email_id
                })(<Input placeholder="Input your value here" />)}
            </Form.Item>
            <Form.Item label="Job Title">
                {getFieldDecorator('job_title', {
                    rules: [{ required: true, message: 'Cannot be empty!' }],
                    initialValue: props.job_title
                })(<Input placeholder="Input your value here" />)}
            </Form.Item>
            <Form.Item label="Years of Experiance">
                {getFieldDecorator('years_of_experiance', {
                    rules: [{ required: true, message: 'Cannot be empty!' }],
                    initialValue: props.job_title
                })(<InputNumber placeholder="Input your value here" />)}
            </Form.Item>

            <Form.Item label={null}>
                {getFieldDecorator('terms', {
                    rules: [
                        { required: true, message: 'Please accept terms and condition' },
                    ],
                })(
                    <Checkbox terms="checked">
                        I accept the <span className={'secondary-color'}>Terms and Conditions</span>
                    </Checkbox>,
                )}
            </Form.Item>

            <Form.Item>
                <Button type="default" onClick={storeValues} >
                    Back
                </Button>
                <Button type="primary" onClick={validateInput}>
                    SEND OTP
                </Button>
            </Form.Item>
        </Form>
    );
});

export default StepTwo;