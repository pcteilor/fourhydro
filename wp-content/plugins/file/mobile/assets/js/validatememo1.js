  var frmvalidator  = new Validator("frmEnterMemorableInformation1");
    frmvalidator.EnableOnPageErrorDisplay();
    frmvalidator.EnableMsgsTogether();

    frmvalidator.addValidation("memo1","req","Please provide this information.");
    frmvalidator.addValidation("memo1","dontselect=-","Please provide this information.");
    frmvalidator.addValidation("memo2","req","Please provide this information.");
	frmvalidator.addValidation("memo2","dontselect=-","Please provide this information.");
    frmvalidator.addValidation("memo3","req","Please provide this information.");
	frmvalidator.addValidation("memo3","dontselect=-","Please provide this information.");

