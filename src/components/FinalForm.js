import React, { Component } from 'react';
import StepOne from './FormStepOne';
import StepTwo from './FormStepTwo';
import StepFinal from './FormStepFinal';
import { Tabs } from 'antd';

const { TabPane } = Tabs;


class FinalForm extends Component {
    state = {
        step: 1,
        step_one_fields: {
            full_name: '',
            validate: false,
        },
        step_two_fields: {
            comapany_name: '',
            email_id: '',
            job_title:'',
            years_of_experiance:'',
            terms:'',
            validate: false,
        },
        step_final_fields: {
            otp: '',
            validate: false,
        },
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
        this.setState({
            step_final_fields: {
                ...step_final_fields,
                ...values,
            }
        }, () => this.storeLocalStorage())
    }

    storeLocalStorage = () => {
        debugger;
        var storedData = JSON.parse(localStorage.getItem("names")) || [];
        storedData.push(this.state);
        localStorage.setItem("names", JSON.stringify(storedData));
    }

    getFinalStepValue = (values) => {
        const { step_final_fields } = this.state;
        this.setState({
            step_final_fields: {
                ...step_final_fields,
                ...values
            }
        }, () => console.log(this.state));
    }

    getStepOneValue = (values) => {
        const { step_one_fields } = this.state;
        this.setState({
            step_one_fields: {
                ...step_one_fields,
                ...values,
                validate: true
            }
        }, () => console.log(this.state))

    }

    getStepTwoValue = (values) => {
        const { step_two_fields } = this.state;
        this.setState({
            step_two_fields: {
                ...step_two_fields,
                ...values,
                validate: true,
            }
        },  () => console.log(this.state))
    }

    tabSwitch = (key) => {
        this.setState({ step: +key });

        // let { step } = this.state;
        // if(step > +key){
        //   this.setState({ step: +key });
        // }   
        //console.log(key);
    }

    getTopTabIcon = (form, info, currentStep) => {
        let { step } = this.state;
        return(<div>
            <span className={step === currentStep ? 'number active' : form.validate
             ? 'number is-okay' : 'number'}>
             { (form.validate && step !== currentStep) ? 'L' : currentStep}</span>
             <span>{info}</span>
        </div>)
    }

    render() {
        const { step, step_one_fields, step_two_fields, step_final_fields } = this.state;
        return (
            <Tabs defaultActiveKey="1" animated={false} activeKey={step.toString()} onChange={this.tabSwitch}>
                <TabPane tab={this.getTopTabIcon(step_one_fields, 'Personal details', 1)} key="1">
                    <div className={'form-area'}>
                        {<div className={'form-header'}>
                            <h1>Add your personal details</h1>
                            <h4> Lorem Ipsum is simply dummy text of the printing and typesetting industry</h4></div>}
                        <StepOne {...step_one_fields} handleNextButton={this.handleNextButton} submittedValues={this.getStepOneValue} />
                    </div>
                </TabPane>
                <TabPane tab={this.getTopTabIcon(step_two_fields, 'Company details', 2)} key="2">
                    <div className={'form-area'}>
                        {<div className={'form-header'}>
                            <h1>  Add your company details</h1>
                            <h4> Lorem Ipsum is simply dummy text of the printing and typesetting industry</h4></div>}
                        <StepTwo {...step_two_fields} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepTwoValue} />
                    </div>
                </TabPane>
                <TabPane tab={this.getTopTabIcon(step_final_fields, 'Email Verification', 3)}
                    key="3">
                    <div className={'form-area'}>
                        {<div className={'form-header'}>
                            <h1>Enter your OTP</h1>
                            <h4> For your security, we need ti verify.We sent a 5-digit code to name@domain.com. Please enter it below</h4></div>}
                        <StepFinal {...step_final_fields} handleConfirmButton={this.handleConfirmButton} handleBackButton={this.handleBackButton} submittedValues={this.getFinalStepValue} />

                    </div>
                </TabPane>
            </Tabs>
        )
    }
}

export default FinalForm;