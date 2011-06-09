
//Create js controller object
AppCtl = {};

//Ruby Interface Functions
function appctl_getOcDest()  { return AppCtl.getOcDest() };
function appctl_getOcServer(){ return AppCtl.getOcServer() };
function appctl_getPort()    { return AppCtl.getPort() };

// Track preferences
AppCtl.db = new air.SQLConnection()
AppCtl.db.open(air.File.applicationStorageDirectory.resolvePath("preferences.sql"));

// Factory Defaults
AppCtl.ocPort = "3000";
AppCtl.ocServer = "greenbean";
AppCtl.ocDestination = "whathappened";

$(document).ready( TaTUi.Loaded );


// Http Port
AppCtl.getPort = function()
{
	return AppCtl.getOneLineDb('PORT', AppCtl.ocPort);
};
AppCtl.setPort = function(val)
{
	AppCtl.setOneLineDb('PORT',val);
};

// Server Name
AppCtl.getOcServer = function()
{
	return AppCtl.getOneLineDb('OCSERVER', AppCtl.ocServer);
}
AppCtl.setOcServer = function(val)
{
	AppCtl.setOneLineDb('OCSERVER',val);
};

// Server Jid Name
AppCtl.getOcDest = function()
{
	return AppCtl.getOneLineDb('OCDEST', AppCtl.ocDestination);
}
AppCtl.setOcDest = function(val)
{
	AppCtl.setOneLineDb('OCDEST',val);
};

//
//  Persist a value in a one line database table
//
AppCtl.getOneLineDb = function(table, init)
{
	var val = init;
	s = new air.SQLStatement();
	s.sqlConnection = AppCtl.db;
	try
	{
		s.text = 'SELECT * from '+table;
		s.execute();
		var result = s.getResult();
		var dbdata = result.data;
		if (dbdata != null)
		{
		  	//AppCtl.dbdata = dbdata;
			val = dbdata[0].value;
		}
	}
	catch (e)
	{
		s.text = 'CREATE TABLE '+table+' (value TEXT)';
		s.execute();
	}
	return val;
};

//
//  Persist a value in a one line database table
//
AppCtl.setOneLineDb = function(table, val)
{
	s = new air.SQLStatement();
	s.sqlConnection = AppCtl.db;

	function insertValues()
	{
		s.text = 'INSERT INTO '+table+' (value)  VALUES ("'+val+'")';
		s.execute();
	};

	try
	{
		s.text = 'DELETE FROM '+table;
		s.execute();
		insertValues();
	}
	catch(e)
	{
		s.text = 'CREATE TABLE '+table+' (value TEXT)';
		s.execute();
		insertValues();
	}
};

