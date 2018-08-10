Juan Carlos Orozco WISHLIST:

Make a custom field for PLUS_MINUS_updateShape instead of needing mutationToDom, domToMutation and updateShape_ methods.

Implement a bi_for_in that takes the variable as an argument and not a a text name.

Support for calculated fields for example on maps like {[a]:1, b:2, c:3} (in this case [a] is evaluated to generate the corresponding key to the first map element?). Check js documentation.

Support debug or step by step execution.

Create helper functions for readability. Ex:
function repeat(times){...}. This requires repeat(times, function(){}). Maybe change this function call so that the anonymous function gets converted to a statment input list.
Generate this call when adding a repeat block (instead of the for block)

Support modules
Support extensions

When one selects a block -> code line is selected
When one selects a part of code -> corresponding block is selected

Use a safe eval() with debug options. 