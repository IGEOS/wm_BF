/**
 * Add all your dependencies here.
 *
 * @require overrides/override-ext-ajax.js
 * @require widgets/Viewer.js
 * @require plugins/LayerTree.js
 * @require plugins/OLSource.js
 * @require plugins/OSMSource.js
 * @require plugins/WMSCSource.js
 * @require plugins/ZoomToExtent.js
 * @require plugins/NavigationHistory.js
 * @require plugins/Zoom.js
 * @require plugins/AddLayers.js
 * @require plugins/RemoveLayer.js
 * @require plugins/ZoomToLayerExtent.js
 * @require RowExpander.js
 * @require plugins/WMSGetFeatureInfo.js
 * @require plugins/Legend.js
 */

var app = new gxp.Viewer({
    portalConfig: {
        layout: "border",
        region: "center",
	proxy: "http://localhost:8080/geoserver",
        
        // by configuring items here, we don't need to configure portalItems
        // and save a wrapping container
        items: [{
            id: "centerpanel",
            xtype: "panel",
            layout: "fit",
            region: "center",
            border: false,
            items: ["mymap"]
        }, {
	    id: "westcontainer",
	    xtype: "container",
	    layout: "vbox",
	    region: "west",
	    width: 200,
	    defaults: {
        	width: "100%",
	        layout: "fit"
    	    },
	    items: [{
	        title: "Layers",
        	id: "westpanel",
	        border: false,
	        flex: 1
            }, {
	        id: "legendpanel",
	        height: 250
            }]}
        }],
        bbar: {id: "mybbar"}
    },
    
    // configuration of all tool plugins for this application
    tools: [{
        ptype: "gxp_layertree",
        outputConfig: {
            id: "tree",
            border: true,
            tbar: [] // we will add buttons to "tree.bbar" later
        },
        outputTarget: "westpanel"
    }, {
        ptype: "gxp_addlayers",
        actionTarget: "tree.tbar"
    }, {
        ptype: "gxp_removelayer",
        actionTarget: ["tree.tbar", "tree.contextMenu"]
    }, {
        ptype: "gxp_zoomtoextent",
        actionTarget: "map.tbar"
    }, {
        ptype: "gxp_zoom",
        actionTarget: "map.tbar"
    }, {
        ptype: "gxp_navigationhistory",
        actionTarget: "map.tbar"
    }, {
	ptype: "gxp_zoomtolayerextent",
	actionTarget: ["tree.tbar", "tree.contextMenu"]
    }, {
    ptype: "gxp_wmsgetfeatureinfo",
    outputConfig: {
        width: 400
    },
    actionTarget: {
        target: "map.tbar",
        index: 1
    }, {
     ptype: "gxp_legend",
     outputTarget: "legendpanel"
    }],
    
    // layer sources
    sources: {
        local: {
            ptype: "gxp_wmscsource",
            url: "/geoserver/wms",
            version: "1.1.1"
        },
        osm: {
            ptype: "gxp_osmsource"
        }
    },
    
    // map and layers
    map: {
        id: "mymap", // id needed to reference map in portalConfig above
        title: "Map",
        projection: "EPSG:900913",
        center: [-10764594.758211, 4523072.3184791],
        zoom: 3,
        layers: [{
            source: "osm",
            name: "mapnik",
            group: "background"
        }, {
            source: "local",
            name: "usa:states",
            selected: true
        }],
        items: [{
            xtype: "gx_zoomslider",
            vertical: true,
            height: 100
        }]
    }

});
