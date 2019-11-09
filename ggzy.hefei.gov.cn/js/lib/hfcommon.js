
//友情链接
        function OpenSelect(item) { 
            var optionStr = item.options[item.selectedIndex].value; 
            item.selectedIndex = 0; 
            if (optionStr != "") { 
                window.open(optionStr, '_blank') 
            } 
        }

