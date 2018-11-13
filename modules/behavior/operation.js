import {
    event as d3_event,
    select as d3_select
} from 'd3-selection';

import { uiFlash } from '../ui';
import { utilKeybinding } from '../util';


/* Creates a keybinding behavior for an operation */
export function behaviorOperation() {
    var keybinding;
    var _operation;

    var behavior = function () {
        if (_operation && _operation.available()) {
            keybinding = utilKeybinding('behavior.key.' + _operation.id);
            keybinding.on(_operation.keys, function() {
                d3_event.preventDefault();
                var disabled = _operation.disabled();
                var flash;

                if (disabled) {
                    flash = uiFlash()
                        .duration(4000)
                        .iconName('#iD-operation-' + _operation.id)
                        .iconClass('operation disabled')
                        .text(_operation.tooltip);

                    flash();

                } else {
                    flash = uiFlash()
                        .duration(2000)
                        .iconName('#iD-operation-' + _operation.id)
                        .iconClass('operation')
                        .text(_operation.annotation() || _operation.title);

                    flash();
                    _operation();
                }
            });

            d3_select(document).call(keybinding);
        }

        return behavior;
    };


    behavior.off = function() {
        if (keybinding) {
            d3_select(document).call(keybinding.off);
        }
    };


    behavior.which = function (_) {
        if (!arguments.length) return _operation;
        _operation = _;
        return behavior;
    };


    return behavior;
}
