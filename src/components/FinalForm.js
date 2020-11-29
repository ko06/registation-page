import React, { Component } from 'react';
import StepOne from './FormStepOne';
import StepTwo from './FormStepTwo';
import StepFinal from './FormStepFinal';
import { Tabs, message } from 'antd';

const { TabPane } = Tabs;


class FinalForm extends Component {

    constructor(props) {
        super(props)

        for (let i = 0; i < 5; i++) {
            this[`field${i}`] = React.createRef()
        }
        this.state = {
            step: 1,
            step_one_fields: {
                full_name: '',
                validate: false,
                country_name: '',
                state: '',
            },
            step_two_fields: {
                comapany_name: '',
                email_id: '',
                job_title: '',
                years_of_experiance: '',
                terms: '',
                validate: false,
            },
            step_final_fields: {
                otp: [],
                validate: false,
            },
            imageLoader: false,
            imageUrl: null,
        }
    }


    tabSwitch = (key) => {
        const { step } = this.state;
        this.setState({ step: key });
    }

    handleNextButton = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    }

    handleBackButton = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 })
    }

    handleConfirmButton = (values) => {
        const { step_final_fields } = this.state;
        const { showPage } = this.props;
        this.setState({
            step_final_fields: {
                ...step_final_fields,
                ...values,
            }
        }, () => this.nextPage())
    }

    handleOTPMessage = (position, event) => {
        const { step_final_fields } = this.state;
        let otpMessage = [...this.state.step_final_fields.otp]
        let value = event.target.value
        otpMessage[position] = value;
        this.setState({
            step_final_fields: {
                ...step_final_fields,
                otp: otpMessage,
            }
        })
        if (value === ' ') {
            message.warning('Please enter valid input')
            return 0;
        }
        if (value === '') {
            return 0;
        }
        if (position < 4) {
            this[`field${position + 1}`].current.focus()
        }
    }

    nextPage = () => {
        var storedData = JSON.parse(localStorage.getItem("names")) || [];
        storedData.push(this.state);
        localStorage.setItem("names", JSON.stringify(storedData));
        message.success('You info stored in local storage!');
        this.props.showPage()
    }

    getFinalStepValue = (values) => {
        const { step_final_fields } = this.state;
        this.setState({
            step_final_fields: {
                ...step_final_fields,
                ...values
            }
        });
    }

    getStepOneValue = (values) => {
        const { step_one_fields } = this.state;
        this.setState({
            step_one_fields: {
                ...step_one_fields,
                ...values,
                validate: true
            }
        })

    }

    getStepTwoValue = (values) => {
        const { step_two_fields } = this.state;
        this.setState({
            step_two_fields: {
                ...step_two_fields,
                ...values,
                validate: true,
            }
        }, () => console.log(this.state))
    }

    selectCountry = (val) => {
        const { step_one_fields } = this.state;
        console.log(val)
        this.setState({
            step_one_fields: {
                ...step_one_fields,
                country_name: val,
            }
        })
    }

    selectRegion = (val) => {
        const { step_one_fields } = this.state;
        console.log(val)
        this.setState({
            step_one_fields: {
                ...step_one_fields,
                state: val,
            }
        })
    }


    getTopTabIcon = (form, info, currentStep) => {
        let { step } = this.state;
        return (<div>
            <span className={step === currentStep ? 'number active' : form.validate
                ? 'number is-okay' : 'number'}>
                {(form.validate && step !== currentStep) ? 'L' : currentStep}</span>
            <span>{info}</span>
        </div>)
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            callback(reader.result)
        });
        reader.readAsDataURL(img);
    }

    handleImageChange = info => {
        const isJPG = info.file.type === 'image/jpeg';
        if (!isJPG) {
            this.setState({
                imageUrl: null,
            })
            return;
        }
        this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
                imageUrl,
                imageLoader: false,
            }),
        );
    };

    render() {
        const { step, step_one_fields, step_two_fields, step_final_fields, imageUrl, imageLoader } = this.state;
        return (
            <Tabs defaultActiveKey="1" animated={false} activeKey={step.toString()} onChange={this.tabSwitch}>
                <TabPane tab={this.getTopTabIcon(step_one_fields, 'Personal details', 1)} key="1">
                    <div className={'form-area'}>
                        {<div className={'form-header'}>
                            <h1>Add your personal details</h1>
                            <h4> Lorem Ipsum is simply dummy text of the printing and typesetting industry</h4></div>}
                        <StepOne {...step_one_fields} selectRegion={this.selectRegion}
                            selectCountry={this.selectCountry} handleNextButton={this.handleNextButton} submittedValues={this.getStepOneValue} />
                    </div>
                </TabPane>
                <TabPane tab={this.getTopTabIcon(step_two_fields, 'Company details', 2)} key="2">
                    <div className={'form-area'}>
                        {<div className={'form-header'}>
                            <h1>  Add your company details</h1>
                            <h4> Lorem Ipsum is simply dummy text of the printing and typesetting industry</h4></div>}
                        <StepTwo {...step_two_fields} handleNextButton={this.handleNextButton} handleImageChange={this.handleImageChange} handleBackButton={this.handleBackButton} submittedValues={this.getStepTwoValue} imageUrl={imageUrl}
                            imageLoader={imageLoader} />
                    </div>
                </TabPane>
                <TabPane tab={this.getTopTabIcon(step_final_fields, 'Email Verification', 3)}
                    key="3">
                    <div className={'form-area'}>
                        {<div className={'form-header'}>
                            <h1>Enter your OTP</h1>
                            <h4> For your security, we need to verify.We sent a 5-digit code to name@domain.com. Please enter it below</h4></div>}
                        <StepFinal {...step_final_fields} nextPage={this.nextPage} handleConfirmButton={this.handleConfirmButton} handleOTPMessage={this.handleOTPMessage} handleBackButton={this.handleBackButton} submittedValues={this.getFinalStepValue} that={this} />

                    </div>
                </TabPane>
            </Tabs>
        )
    }
}

export default FinalForm;