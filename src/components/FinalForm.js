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
        },
        step_two_fields: {
            comapany_name: '',
        },
        step_final_fields: {
            otp: '',
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
                ...values
            }
        }, () => console.log(this.state));
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
                ...values
            }
        })
    }

    getStepTwoValue = (values) => {
        const { step_two_fields } = this.state;
        this.setState({
            step_two_fields: {
                ...step_two_fields,
                ...values
            }
        })
    }

    tabSwitch = (key) => {
        this.setState({ step: +key });
        //console.log(key);
    }

    render() {
        const { step, step_one_fields, step_two_fields, step_final_fields } = this.state;
        return (
            <Tabs defaultActiveKey="1" animated={false} activeKey={step.toString()} onChange={this.tabSwitch}>
                <TabPane tab="Personal Details" key="1">
                    <div className={'form-area'}>
                        {<><h1>  Add your personal details</h1>
                            <h3> Lorem Ipsum is simply dummy text of the printing and typesetting industry</h3></>}
                        <StepOne {...step_one_fields} handleNextButton={this.handleNextButton} submittedValues={this.getStepOneValue} />
                    </div>
                </TabPane>
                <TabPane tab="Company Details" key="2">
                    <div  className={'form-area'}>
                        {<><h1>  Add your company details</h1>
                            <h3> Lorem Ipsum is simply dummy text of the printing and typesetting industry</h3></>}
                        <StepTwo {...step_two_fields} handleNextButton={this.handleNextButton} handleBackButton={this.handleBackButton} submittedValues={this.getStepTwoValue} />
                    </div>
                </TabPane>
                <TabPane tab="Email Verification" key="3">
                    <div  className={'form-area'}>
                    {<><h1>Enter your OTP</h1>
                        <h3> Lorem Ipsum is simply dummy text of the printing and typesetting industry</h3></>}
                        <StepFinal {...step_final_fields} handleConfirmButton={this.handleConfirmButton} handleBackButton={this.handleBackButton} submittedValues={this.getFinalStepValue} />

                    </div>
                </TabPane>
            </Tabs>
        )
    }
}

export default FinalForm;