
Ext.define('WK.override.menu.Item', {
    override: 'Ext.menu.Item',
    
    compatibility: 'IE@8',
    
    onFocus: function(e) {
        this.callParent([e]);
        this.repaintFontIcons();
    },
    
    onFocusLeave: function(e) {
        this.callParent([e]);
        this.repaintFontIcons();
    },
    
    privates: {
        repaintFontIcons: function() {
            var itemEl = this.itemEl,
                textEl = this.textEl,
                fly;

            // This application uses font icons on some elements that the framework
            // does not expect, so we have to extend its normal IE8 workarounds

            if (itemEl && this.el.hasCls('font-icon')) {
                itemEl.syncRepaint();
            }
            
            if (textEl) {
                fly = Ext.fly(textEl.dom.firstChild);
                
                if (fly && fly.hasCls(Ext.baseCSSPrefix + 'fa')) {
                    fly.syncRepaint();
                }
            }
        }
    }
});
