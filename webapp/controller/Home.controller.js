sap.ui.define([
    "./BaseController",
    "sap/ui/Device",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    function (Controller, Device, MessageBox,MessageToast) {
        "use strict";

        return Controller.extend("com.app.rfscreens.controller.Home", {
            onInit: function () {

            },
            onCloseDialog: function () {
                if (this.ologinDialog.isOpen()) {
                    this.ologinDialog.close()
                }
            },

            onPressSignupBtn: async function () {
                if (!this.oActiveLoansDialog) {
                    this.oActiveLoansDialog = await this.loadFragment("SignUpDetails")
                }
                this.oActiveLoansDialog.open();
            },

            //Register Dialog close Btn...
            onCloseRegisterDialog: function () {
                this.oActiveLoansDialog.close();
            },
            handleLinkPress: async function () {
                if (!this.oforgotDialog) {
                    this.oforgotDialog = await this.loadFragment("Forgotpassword")
                }
                this.oforgotDialog.open();
            },
            onRsesetPress: function () {
                this.oforgotDialog.close();
            },
            onClearRegisterDialog: function () {
                var oView = this.getView();

                // Clear the value of each input field
                oView.byId("idPhoneNumberInput").setValue("");
                oView.byId("idCreatePasswordInput").setValue("");
                oView.byId("idInputuserType").setValue("");
                oView.byId("idInputuserType8").setValue("");

                // Clear the value of each ComboBox
                oView.byId("_IDGenComboBox1").setSelectedKey("");
                oView.byId("_IDGenComboBox5").setSelectedKey("");
                oView.byId("_IDGenComboBox2").setSelectedKey("");
                oView.byId("_IDGenComboBox3").setSelectedKey("");
            },
            /**Based on Selected key DropDown Should be visible */
            // onSelect: function (oEvent) {
            //     var oArea = oEvent.getSource().getSelectedKey();
            //     if (oArea === 'Inbound') {
            //         this.byId("_IDGenComboBox2").setVisible(true);
            //         this.byId("_IDGenComboBox3").setVisible(false);
            //         this.byId("_IDGenComboBox4").setVisible(false);
            //         this.byId("_IDGenComboBox5").setVisible(false);

            //     } else if (oArea === 'Outbound') {
            //         this.byId("_IDGenComboBox2").setVisible(false);
            //         this.byId("_IDGenComboBox3").setVisible(true);
            //         this.byId("_IDGenComboBox4").setVisible(false);
            //         this.byId("_IDGenComboBox5").setVisible(false);

            //     } else if (oArea === 'Internal') {
            //         this.byId("_IDGenComboBox2").setVisible(false);
            //         this.byId("_IDGenComboBox3").setVisible(false);
            //         this.byId("_IDGenComboBox4").setVisible(true);
            //         this.byId("_IDGenComboBox5").setVisible(false);
            //     } else {
            //         this.byId("_IDGenComboBox2").setVisible(false);
            //         this.byId("_IDGenComboBox3").setVisible(false);
            //         this.byId("_IDGenComboBox4").setVisible(false);
            //         this.byId("_IDGenComboBox5").setVisible(true);
            //     }
            // },
            onCheckBoxSelect: function () {
                // Retrieve the checkbox states
                var isInboundSelected = this.byId("inboundCheckBox").getSelected();
                var isOutboundSelected = this.byId("outboundCheckBox").getSelected();
                var isInternalSelected = this.byId("internalCheckBox").getSelected();

                // Control visibility of ComboBoxes based on selected checkboxes
                if (isInboundSelected) {
                    this.byId("_IDGenComboBox2").setVisible(true);
                } else {
                    this.byId("_IDGenComboBox2").setVisible(false);
                }

                if (isOutboundSelected) {
                    this.byId("_IDGenComboBox3").setVisible(true);
                } else {
                    this.byId("_IDGenComboBox3").setVisible(false);
                }

                if (isInternalSelected) {
                    this.byId("_IDGenComboBox4").setVisible(true);
                } else {
                    this.byId("_IDGenComboBox4").setVisible(false);
                }

                // Set visibility for any additional ComboBoxes if required
                this.byId("_IDGenComboBox5").setVisible(!isInboundSelected && !isOutboundSelected && !isInternalSelected);
            },
            /**Getting Signup form Details*/
            onSubmitPress: function () {

                const oUserView = this.getView();
                var oArea = this.byId("_IDGenComboBox1").getSelectedKey();
                /**here OArea may be inbound,outbound or Internal based on OArea we get the values */
                var oItem;
                if (oArea === 'Inbound') {
                    oItem = this.byId("_IDGenComboBox2").getSelectedKey();
                } else if (oArea === 'Outbound') {
                    oItem = this.byId("_IDGenComboBox3").getSelectedKey();
                } else {
                    oItem = this.byId("_IDGenComboBox4").getSelectedKey();
                }

                var oResource = this.byId("idPhoneNumberInput").getValue();
                var oUsername = this.byId("idCreatePasswordInput").getValue();
                var oEmail = this.byId("idInputuserType").getValue();
                var oPhone = this.byId("idInputuserType8").getValue();
                /**generating Password */
                function generatePassword() {
                    const regex = /[A-Za-z@!#$%&]/;
                    const passwordLength = 8;
                    let password = "";

                    for (let i = 0; i < passwordLength; i++) {
                        let char = '';
                        while (!char.match(regex)) {
                            char = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
                        }
                        password += char;
                    }

                    return password;
                }
                var oPassword = generatePassword();

                var bValid = true;
                // Validate fields and set value state and messages
                if (!oArea) {
                    oUserView.byId("_IDGenComboBox1").setValueState("Error");
                    oUserView.byId("_IDGenComboBox1").setValueStateText("Select a Area");
                    bValid = false;
                } else {
                    oUserView.byId("_IDGenComboBox1").setValueState("None");
                }

                if (!oResource) {
                    oUserView.byId("idPhoneNumberInput").setValueState("Error");
                    oUserView.byId("idPhoneNumberInput").setValueStateText("Resource ID cannot be empty");
                    bValid = false;
                } else {
                    oUserView.byId("idPhoneNumberInput").setValueState("None");
                }

                if (!oUsername) {
                    oUserView.byId("idCreatePasswordInput").setValueState("Error");
                    oUserView.byId("idCreatePasswordInput").setValueStateText("Username cannot be empty");
                    bValid = false;
                } else {
                    oUserView.byId("idCreatePasswordInput").setValueState("None");
                }

                if (!oEmail) {
                    oUserView.byId("idInputuserType").setValueState("Error");
                    oUserView.byId("idInputuserType").setValueStateText("Email cannot be empty");
                    bValid = false;
                } else {
                    oUserView.byId("idInputuserType").setValueState("None");
                }

                if (!oPhone || oPhone.length !== 10 || !/^\d+$/.test(oPhone)) {
                    oUserView.byId("idInputuserType8").setValueState("Error");
                    oUserView.byId("idInputuserType8").setValueStateText("Mobile number must be a 10-digit numeric value");
                    bValid = false;
                } else {
                    oUserView.byId("idInputuserType8").setValueState("None");
                }

                // Validate the ComboBox based on the selected area
                if (oArea === 'Inbound') {
                    if (!oItem) {
                        oUserView.byId("_IDGenComboBox2").setValueState("Error");
                        oUserView.byId("_IDGenComboBox2").setValueStateText("Select a value from Inbound process");
                        bValid = false;
                    } else {
                        oUserView.byId("_IDGenComboBox2").setValueState("None");
                    }
                } else if (oArea === 'Outbound') {
                    if (!oItem) {
                        oUserView.byId("_IDGenComboBox3").setValueState("Error");
                        oUserView.byId("_IDGenComboBox3").setValueStateText("Select a value from Outbound process");
                        bValid = false;
                    } else {
                        oUserView.byId("_IDGenComboBox3").setValueState("None");
                    }
                } else if (oArea === 'Internal') {
                    if (!oItem) {
                        oUserView.byId("_IDGenComboBox4").setValueState("Error");
                        oUserView.byId("_IDGenComboBox4").setValueStateText("Select a value from Internal process");
                        bValid = false;
                    } else {
                        oUserView.byId("_IDGenComboBox4").setValueState("None");
                    }
                }

                if (!bValid) {
                    sap.m.MessageToast.show("Please fill all the required fileds");
                    return; // Prevent further execution
                }

                var oModel = this.getView().getModel();
                var that = this;
                oModel.create("/RFUISet", { Resourceid: oResource, Validity: false, Resourcename: oUsername, Area: oArea, Email: oEmail, Phonenumber: oPhone, Password: oPassword, Resourcegroup: oItem }, {
                    success: function (oData) {
                        sap.m.MessageToast.show("your details are sent to supervisior please wait until you get the approval");
                        that.oActiveLoansDialog.close();
                    },
                    error: function (oError) {
                        MessageBox.error("Error");
                    }
                })
            },
            onSubmitPress: function () {
                const oUserView = this.getView();

                // Get selected process areas
                let selectedAreas = [];
                if (oUserView.byId("inboundCheckBox").getSelected()) {
                    selectedAreas.push("Inbound");
                }
                if (oUserView.byId("outboundCheckBox").getSelected()) {
                    selectedAreas.push("Outbound");
                }
                if (oUserView.byId("internalCheckBox").getSelected()) {
                    selectedAreas.push("Internal");
                }

                // Get selected values from ComboBoxes based on selected areas
                let selectedItems = {};
                if (selectedAreas.includes('Inbound')) {
                    selectedItems['Inbound'] = oUserView.byId("_IDGenComboBox2").getSelectedKey();
                }
                if (selectedAreas.includes('Outbound')) {
                    selectedItems['Outbound'] = oUserView.byId("_IDGenComboBox3").getSelectedKey();
                }
                if (selectedAreas.includes('Internal')) {
                    selectedItems['Internal'] = oUserView.byId("_IDGenComboBox4").getSelectedKey();
                }

                // Get values from other inputs
                var oResource = this.byId("idEmployeeIDInput").getValue();
                var oUsername = this.byId("idResourceNameInput").getValue();
                var oEmail = this.byId("idInputEmail").getValue();
                var oPhone = this.byId("idInputPhoneNumber").getValue();

                // Generate Password
                function generatePassword() {
                    const regex = /[A-Za-z@!#$%&]/;
                    const passwordLength = 8;
                    let password = "";

                    for (let i = 0; i < passwordLength; i++) {
                        let char = '';
                        while (!char.match(regex)) {
                            char = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
                        }
                        password += char;
                    }

                    return password;
                }
                var oPassword = generatePassword();

                // Validation
                var bValid = true;

                if (selectedAreas.length === 0) {
                    sap.m.MessageToast.show("Select at least one Process Area");
                    bValid = false;
                }

                if (!oResource) {
                    oUserView.byId("idEmployeeIDInput").setValueState("Error");
                    oUserView.byId("idEmployeeIDInput").setValueStateText("Employee ID cannot be empty");
                    bValid = false;
                } else {
                    oUserView.byId("idEmployeeIDInput").setValueState("None");
                }

                if (!oUsername) {
                    oUserView.byId("idResourceNameInput").setValueState("Error");
                    oUserView.byId("idResourceNameInput").setValueStateText("Resource Name cannot be empty");
                    bValid = false;
                } else {
                    oUserView.byId("idResourceNameInput").setValueState("None");
                }

                if (!oEmail) {
                    oUserView.byId("idInputEmail").setValueState("Error");
                    oUserView.byId("idInputEmail").setValueStateText("Email cannot be empty");
                    bValid = false;
                } else {
                    oUserView.byId("idInputEmail").setValueState("None");
                }

                if (!oPhone || oPhone.length !== 10 || !/^\d+$/.test(oPhone)) {
                    oUserView.byId("idInputPhoneNumber").setValueState("Error");
                    oUserView.byId("idInputPhoneNumber").setValueStateText("Mobile number must be a 10-digit numeric value");
                    bValid = false;
                } else {
                    oUserView.byId("idInputPhoneNumber").setValueState("None");
                }

                // Validate ComboBox selections based on selected areas
                selectedAreas.forEach(area => {
                    if (!selectedItems[area]) {
                        if (area === 'Inbound') {
                            oUserView.byId("_IDGenComboBox2").setValueState("Error");
                            oUserView.byId("_IDGenComboBox2").setValueStateText("Select a value from Inbound process");
                        } else if (area === 'Outbound') {
                            oUserView.byId("_IDGenComboBox3").setValueState("Error");
                            oUserView.byId("_IDGenComboBox3").setValueStateText("Select a value from Outbound process");
                        } else if (area === 'Internal') {
                            oUserView.byId("_IDGenComboBox4").setValueState("Error");
                            oUserView.byId("_IDGenComboBox4").setValueStateText("Select a value from Internal process");
                        }
                        bValid = false;
                    } else {
                        if (area === 'Inbound') {
                            oUserView.byId("_IDGenComboBox2").setValueState("None");
                        } else if (area === 'Outbound') {
                            oUserView.byId("_IDGenComboBox3").setValueState("None");
                        } else if (area === 'Internal') {
                            oUserView.byId("_IDGenComboBox4").setValueState("None");
                        }
                    }
                });

                if (!bValid) {
                    sap.m.MessageToast.show("Please fill all the required fields");
                    return; // Prevent further execution
                }

                // Send data to the backend
                var oModel = this.getView().getModel();
                var that = this;
                oModel.create("/RFUISet", {
                    Resourceid: oResource,
                    Validity: false,
                    Resourcename: oUsername,
                    Area: selectedAreas,
                    Email: oEmail,
                    Phonenumber: oPhone,
                    Password: oPassword,
                    Resourcegroup: selectedItems
                }, {
                    success: function (oData) {
                        sap.m.MessageToast.show("Your details are sent to the supervisor. Please wait until you get the approval.");
                        that.oActiveLoansDialog.close();
                    },
                    error: function (oError) {
                        sap.m.MessageBox.error("Error");
                    }
                });
            },
            onLiveChange: function (oEvent) {
                var temp = oEvent.getParameter('value');
                var wh = '1710';
                var inputField = this.byId('idwhInput');

                if (temp !== wh) {
                    inputField.setValueState('Error'); // or 'Warning' for a warning state
                    MessageBox.error("Choose Correct Warehouse Number");
                } else {
                    inputField.setValueState('None');
                }
            },
            onTogglePasswordVisibility: function () {
                var oView = this.getView();
                var oInput = oView.byId("passwordInput");
                var oButton = oView.byId("toggleButton");

                // Check the current type of the input field
                if (oInput.getType() === "Password") {
                    // Change input type to Text and update icon
                    oInput.setType("Text");
                    oButton.setIcon("sap-icon://hide");
                } else {
                    // Change input type to Password and update icon
                    oInput.setType("Password");
                    oButton.setIcon("sap-icon://show");
                }
            },
            onResourceLoginBtnPress: function () {
                debugger
              
                var oU = this.getView().byId("IdResourceInput").getValue();
                var oP = this.getView().byId("Idpassword").getValue();
                if (oU === "111023" && oP === "Kalyani@123") {
                    this.getRouter().navTo("RouteUsermenu", { id: oU })
                }
                else if (oU === "111024" && oP === "Gayathri@123") {
                    this.getRouter().navTo("RouteUsermenu", { id: oU })
                }

               
                else {
                    MessageToast.show("Provide Correct details")
                }
            },



        });
    });
