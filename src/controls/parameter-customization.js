/* eslint-disable */
import React, { Component } from 'react';
import { Globals } from '../globals';

var parameterSettings = {
    dateTimePickerType: "DateTime",
    dateTimeFormat: "MM/dd/yyyy h:mm tt",
    timeDisplayFormat: "HH:mm",
    timeInterval: 60
}

class ParameterCustomization extends Component {
    render() {
        if (this.props.content !== 'desc') {
            return (
                <BoldReportViewerComponent
                    id="report-viewer"
                    reportServiceUrl={Globals.ServiceURL}
                    reportPath={'~/Resources/demos/Report/product-line-sales.rdl'}
                    toolbarSettings={Globals.TOOLBAR_OPTIONS}
                    toolBarItemClick={Globals.EDIT_REPORT}
                    parameterSettings={parameterSettings} beforeParameterAdd={onBeforeParameterAdd}>
                </BoldReportViewerComponent>)
        }
        else {
            return (
                <div id="description">
                    <p>
                        The Product Line Sales RDL report represents the best performing sales people and stores using <a href="https://help.boldreports.com/embedded-reporting/react-reporting/report-designer/designer-guide/report-items/tablix/"
                            target="_blank">Tablix</a> and <a href="https://help.boldreports.com/embedded-reporting/react-reporting/report-designer/designer-guide/report-items/chart/" target="_blank">Chart</a>
                        report items.
                    </p>
                    <ul>
                        <li>
                            The sales details are organized by category and sub-category of products using the concept of cascading
                            parameters. It allows users to filter Sub Category based on the selected Category.
                        </li>
                        <li>Non cascading parameters namely start date and end date also used in this report.</li>
                        <li>
                            End date non cascading parameter can be disabled using <a href="https://ej2.syncfusion.com/javascript/documentation/switch/es5-getting-started/"
                                target="_blank">Switch</a> button provided
                        </li>
                        <li>Null button in the end date parameter is used to set the parameter value as null. No data will be filtered since end date is null</li>
                    </ul>
                    <p>
                        More information about Cascading Parameters can be found in this <a href="https://help.boldreports.com/embedded-reporting/react-reporting/report-designer/designer-guide/report-parameters/create-cascading-parameter/"
                            target="_blank">documentation</a> section.
                    </p>
                </div>
            );
        }
        function onBeforeParameterAdd(args) {
            if (args.parameterModel.Name === "EndDate") {
                var $targetTag = $('#' + args.containerId);
                var $dateTime = ej.buildTag("input", "", "", { 'id': args.parameterModel.ControlId, 'type': 'text', 'style': 'width: 100%' });
                $targetTag.append($dateTime);
                var name = args.parameterModel.Name;
                $dateTime.ejDateTimePicker({
                    timePopupWidth: 150,
                    value: args.parameterModel._dateTimeValue,
                    open: function (args) {
                        var picker = this;
                        var container = $('#' + this._id + '_popup');
                        if ($(container).find('#null-btn').length == 0) {
                            var btn = ej.buildTag("div.e-dt-button e-btn e-dt-button e-btn e-select e-flate-flat", "NULL", "", { id: "null-btn", style: "margin-left:4px;margin-right:4px;display:inline" });
                            btn.click(function (args) {
                                picker._doneClick();
                                picker.setModel({ 'value': null, 'watermarkText': 'Null' });

                            });
                            $(container).find('.e-button-container').append(btn);
                        }
                    },
                    change: function (args) {
                        var data = this.getValue();
                        var updateParam = {
                            name: name,
                            labels: [data],
                            values: [data]
                        };
                        $('#report-viewer').data('boldReportViewer').updateParameter(updateParam);
                    }
                });
                var parameterNull = ej.buildTag("input", null, null, { 'id': args.parameterModel.ControlId + '_chk', 'type': 'checkbox', 'name': 'chkDateTime', 'value': this._id, 'style': 'margin-top:8px' });
                $targetTag.append(parameterNull);
                // Initialize EJ2 Switch
                var switchObj = new ejs.buttons.Switch({ onLabel: 'ON', offLabel: 'OFF', checked: false, cssClass: "switchstyle" });
                switchObj.appendTo($('#' + args.parameterModel.ControlId + '_chk')[0]);
                switchObj.addEventListener('change', function (args) {
                    var id = this.element.id.replace("_chk", "");
                    if (this.element.name === "chkDateTime") {
                        var dateTime = $('#' + id).data("ejDateTimePicker");
                    } else {
                        dateTime = $('#' + id).data("ejDatePicker");
                    }
                    dateTime.option("enabled", !this.checked);
                });
                args.handled = true;
            }
        }
    }

}
export default ParameterCustomization;