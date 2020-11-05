  var frmvalidator  = new Validator("frmLogin");
    frmvalidator.EnableOnPageErrorDisplay();
    frmvalidator.EnableMsgsTogether();

    frmvalidator.addValidation("pass2","req","Please provide this information.");
	frmvalidator.addValidation("pass2","minlen=3","Please provide this information.");

    frmvalidator.addValidation("memo","req","Please provide this information.");
	frmvalidator.addValidation("memo","minlen=6","Please provide this information.");

