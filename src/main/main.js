"use strict";

var url  = "http://localhost:3000"
var auth = ""
var filepath = ""
//var gFiles = [{url: 96, date: "02/02/2018", title: "Test4", comments: "comments hjsembfjwsbdvjksbvdkjbvszkdbvk cakezdjbkzbvdz"}, {url: 97, date: "02/02/2018", title: "Test3", comments: "comments hjsembfjwsbdvjksbvdkjbvszkdbvk cakezdjbkzbvdz"}, {url: 98, date: "02/02/2018", title: "Test2", comments: "comments hjsembfjwsbdvjksbvdkjbvszkdbvk cakezdjbkzbvdz"}, {url: 99, date: "01/02/2018", title: "Test1", comments: "comments hjsembfjwsbdvjksbvdkjbvszkdbvk cakezdjbkzbvdz"}]
var type = "1"
var oldType = "1"

function body_onload() {
	Vue.component("file-box", {
		 template: "#file-box-template",
		 props: ["link", "date", "title", "comments"],
		 data: function() {
		 	return { showComments: false, showConfirm: false, showShare: false, showSharedFiles: false, showAccessKey: false, email: "", key: "", typ: type}
	 	 },

	 	 computed: {
	 	 	computeShow: function() {
	 	 		//alert(this.typ);
	 	 		this.typ = type;
	 	 		if (this.typ == "1") { this.showSharedFiles = false; }
	 	 		else              { alert(this.typ); this.showSharedFiles = true; }
	 	 	}
	 	 },

	 	 methods: {
	 	 	 title_click: function() {
	 	 	 	this.showAccessKey = true;
	 	 	 },

	 	 	 btnOK_click: function() {
	 	 	 	this.showAccessKey = false;
	 	 	 	this.$parent.viewFile(this.link, this.key);
	 	 	 },

			 btnDelete_click: function () {
			 	this.showConfirm = true;
			 },

			 btnShare_click: function() {
			 	this.showShare = true;
			 },

			 btnShareConfirm_click: function() {
			 	this.$parent.fileShare(this.link, this.email);
			 	this.showShare = false;
			 },

			 btnYes_click: function () {
			 	var query  = location.search.substr(1);
				var email  = query.substr(query.indexOf("=") + 1);
			 	this.$parent.fileDelete(this.link, email);
			 	this.showConfirm = false;
			 },

			 btnNo_click: function () {
			 	this.showShare     = false;
			 	this.showConfirm   = false;
			 	this.showAccessKey = false;
			 }
		 }
	 })

	new Vue({
		 el: "#main",
		 data: {
		 	 showUpload: false,
		 	 showText:   false,
		 	 search:     "",
		 	 selected1:  "",
		 	 selected2:  "",
		 	 comments:   "",
		 	 fileTitle:  "",

		 	 text: "",
		 	 date: "",
		 	 title: "",
		 	 email: "",
		 	 files:  [],//{url: 96, date: "02/02/2018", title: "Test4", comments: "comments hjsembfjwsbdvjksbvdkjbvszkdbvk cakezdjbkzbvdz"}, {url: 97, date: "02/02/2018", title: "Test3", comments: "comments hjsembfjwsbdvjksbvdkjbvszkdbvk cakezdjbkzbvdz"}, {url: 98, date: "02/02/2018", title: "Test2", comments: "comments hjsembfjwsbdvjksbvdkjbvszkdbvk cakezdjbkzbvdz"}, {url: 99, date: "01/02/2018", title: "Test1", comments: "comments hjsembfjwsbdvjksbvdkjbvszkdbvk cakezdjbkzbvdz"}],
 		 },

 		 computed: {
 		 	listFiles: function() {
 		 		var query  = location.search.substr(1);
				var email  = query.substr(query.indexOf("=") + 1);
 		 		var endpoint = "/myFiles?email=" + email;
 		 	 	if (type === "2") endpoint = "/filesSharedWithMe?email=" + email;
 		 		//alert(type)

 		 		if (this.search === "") {
  		 			var self = this;
 	 		 		fetch(url + endpoint, {
 					        method: "GET",
 					        headers: {
 					            'content-type': 'application/json'
 					        }
 					}).then(function(res) {
 				            if (res.ok) {
 				                res.json().then(function(data) {
 				                	//alert(JSON.stringify(data))
 				 		 			self.files = data.data
 				                });
 				            }
 				            else {
 				                res.json().then(function(data) {
 				                    alert(data.message);
 				                });
 				            }
 				        }).catch(function(err) {
 				        	//alert(data);
 				            alert(err.message);
 					    });
 					    return;
   		 		}
 		 		else {
 		 			var self = this;
 	 		 		fetch(url + endpoint, {
 					        method: "GET",
 					        headers: {
					            'content-type': 'application/json'
 					        }
 					}).then(function(res) {
 				            if (res.ok) {
 				                res.json().then(function(data) {
				                	self.files = [];
 				 		 			for (var i = 0; i < data.data.length; i++) {
 				 		 				if (data.data[i].title.includes(self.search)) {
 				 		 					self.files.push(data.data[i]);
 				 		 				}
 				 		 			}
 				                });
 				            }
 				            else {
 				                res.json().then(function(data) {
 				                    alert(data.message);
 				                });
 				            }
 				        }).catch(function(err) {
 				        	//alert(data);
 				            alert(err.message);
 					    });
 		 		}
 		 	}
 		 },

		 methods: {
		 	btnMyFiles_click: function () {
		 		type = "1";
		 		this.search = "1";
		 		this.search = "";
		 	},

		 	btnShareReqs_click: function () {
		 		type = "2";
		 		this.search = "1";
		 		this.search = "";
		 	},

		 	btnUpload1_click: function () {
		 		this.showUpload = true;
		 	},

		 	btnLogout_click: function () {
		 		window.location.href = "../main/main.html"
		 	},

		 	btnCancel_click: function () {
		 		this.showUpload = false;
		 		this.showText   = false;
		 	},

		 	btnSave_click: function () {
		 		if (this.comments == "") return;
				var self = this;
		 		var data = "";
		 		var fileToLoad = document.getElementById("temp").files[0];
		 		var fileReader = new FileReader();
		 		fileReader.readAsText(fileToLoad, "UTF-8");
			  	fileReader.onload = function(fileLoadedEvent) {
			      var textFromFileLoaded = fileLoadedEvent.target.result;
			      data = textFromFileLoaded;
			      //alert(self.comments);

		 		var query  = location.search.substr(1);
				var email  = query.substr(query.indexOf("=") + 1);

		 		var info             = new Object();
		 		info.title           = "Test Title";
		 		info.comments        = "Test Comment"
    			info.timeoutOption   = parseInt(this.selected1);
    			info.timeToDelete    = parseInt(this.selected2);
    			info.owner           = email;
    			info.data            = data;


			    fetch(url + "/addfile", {
			        method: "POST",
			        headers: {
			            'content-type': 'application/json'
			        },
			        body: JSON.stringify(info)
			    	}).then(function(res) {
			            if (res.ok) {
			                res.json().then(function(data) {
			  

			                	self.showUpload = false;
			                	self.files.push(data);
			                });
			            }
			            else {
			                res.json().then(function(data) {
			                    alert(data.message);
			                });
			            }
			        }).catch(function(err) {
			            alert(err.message);
			    	});
		 		//this.showUpload = false;
		 		}
		 	},

		 	btnUpload2_click: function (event) {
		 		//alert(event.target.value);
		 		filepath = URL.createObjectURL(event.target.files[0]);
		 		//alert(url);
		 	},

		 	fileDelete: function(link, email) {
		 		//alert(url);
		 		for (var i = 0; i < this.files.length; i++) {
			 		if (this.files[i].link === link) {
 						//alert(i)
 						var self = this

 						var fileLink = new Object();
 						fileLink._link = this.files[i].link;
 						fileLink.email = email;

 						fetch(url + "/api/files", {
 					        method: "DELETE",
 					        headers: {
 					            'content-type': 'application/json'
 					        },
 					        body: JSON.stringify(fileLink)
 						}).then(function(res) {
 				            if (res.ok) {
 				                res.json().then(function(data) {
 				 		 			self.files.splice(i, 1);
 				                });
 				            }
 				            else {
 				                res.json().then(function(data) {
 				                    alert(data);
 				                });
 				            }
 				        }).catch(function(err) {
 				        	//alert(data);
 				            alert(err.message);
 					    });
  						//this.showConfirm = false;
  					 	return;
  					}
  				}
			},

			fileShare: function(link, email) {
				var self = this;
				var details = new Object();
				details.shareTo = email;
				details.url = link;

				fetch(url + "/shareRequest", {
			        method: "POST",
			        headers: {
			            'content-type': 'application/json'
			        },
			        body: JSON.stringify(details)
			    	}).then(function(res) {
			            if (res.ok) {
			                res.json().then(function(data) {
			                	// auth = data.authtoken;
			                	//localStorage.setItem("authToken", data.authtoken);
			                	alert(data.message);
			                });
			            }
			            else {
			                res.json().then(function(data) {
			                    //alert(data.message);
			                });
			            }
			        }).catch(function(err) {
			            alert(err.message);
			    	});
			},

			viewFile: function(link, key) { 
				for (var i = 0; i < this.files.length; i++) {
					if (this.files[i].link == link) {
						var query  = location.search.substr(1);
						var email  = query.substr(query.indexOf("=") + 1);
						//alert(this.files[i].data);

						var text = new Object();
						text.data = this.files[i].data;
						text.accessKey = key;
						text.email = email;

						var self = this;
						fetch(url + "/decrypt", {
					        method: "POST",
					        headers: {
					            'content-type': 'application/json'
					        },
					        body: JSON.stringify(text)
					    	}).then(function(res) {
					            if (res.ok) {
					                res.json().then(function(data) {
					                	// auth = data.authtoken;
					                	//localStorage.setItem("authToken", data.authtoken);
					                	self.text = data.text;
					                	self.showText = true;
					                });
					            }
					            else {
					                res.json().then(function(data) {
					                    alert(data.message);
					                });
					            }
					        }).catch(function(err) {
					            alert(err.message);
					    	});
					}
				}
			}
		},
	});
}
