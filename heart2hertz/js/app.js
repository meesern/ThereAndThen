
//Create js controller object
AppCtl = {};


//Ruby Interface Functions
function appctl_getOcDest()  { return AppCtl.getOcDest() };
function appctl_getOcServer(){ return AppCtl.getOcServer() };
function appctl_getPort()    { return AppCtl.getPort() };
function appctl_getRate()    { return AppCtl.getRate() };
function appctl_getSkip()    { return AppCtl.getSkip() };

//// Track preferences
if (!Browser)
{
  AppCtl.db = new air.SQLConnection()
  AppCtl.db.open(air.File.applicationStorageDirectory.resolvePath("preferences.sql"));
}

// Factory Defaults
AppCtl.defaultPort = "3000";
AppCtl.defaultServer = "greenbean";
AppCtl.defaultItemName = "Tea Service";
AppCtl.defaultRate = "1";
AppCtl.defaultSkip = "0";

$(document).ready( PSUi.Loaded );

// Replay Rate
AppCtl.getRate = function()
{
	return AppCtl.getOneLineDb('RATE', AppCtl.defaultRate);
};
AppCtl.setRate = function(val)
{
	AppCtl.setOneLineDb('RATE',val);
};

// Replay Gap Skip
AppCtl.getSkip = function()
{
	return AppCtl.getOneLineDb('SKIP', AppCtl.defaultSkip);
};
AppCtl.setSkip = function(val)
{
	AppCtl.setOneLineDb('SKIP',val);
};

// Http Port
AppCtl.getPort = function()
{
	return AppCtl.getOneLineDb('PORT', AppCtl.defaultPort);
};
AppCtl.setPort = function(val)
{
	AppCtl.setOneLineDb('PORT',val);
};

// Server Name
AppCtl.getOcServer = function()
{
	return AppCtl.getOneLineDb('OCSERVER', AppCtl.defaultServer);
}
AppCtl.setOcServer = function(val)
{
	AppCtl.setOneLineDb('OCSERVER',val);
};

// Item Name
AppCtl.getItemName = function()
{
	return AppCtl.getOneLineDb('INAME', AppCtl.defaultItemName);
}
AppCtl.setItemName = function(val)
{
	AppCtl.setOneLineDb('INAME',val);
};

// Data Source
AppCtl.getDsFile = function()
{
	saved =  AppCtl.getOneLineDb('DSSRC', 'file');
	AppReport('Source: '+saved);
  	if (saved == 'file')
	  return 1;
	else
	  return 0;
};
AppCtl.setDsFile = function(val)
{
  	if (val == true)
	{
	  AppReport('file source');
	  save = 'file';
	  AppCtl.setOneLineDb('DSSRC',save);
	}
};

AppCtl.getDsCloud = function()
{
	saved =  AppCtl.getOneLineDb('DSSRC', 'file');
  	if (saved == 'file')
	  return 0;
	else
	  return 1;
};
AppCtl.setDsCloud = function(val)
{
  	if (val == true)
	{
	  save = 'cloud';
	  AppCtl.setOneLineDb('DSSRC',save);
	}
};

// Output Type
AppCtl.getOBox = function()
{
	saved =  AppCtl.getOneLineDb('OPTYPE', 'box');
	AppReport('Outupt: '+saved);
  	if (saved == 'box')
	  return 1;
	else
	  return 0;
}
AppCtl.setOBox = function(val)
{
  	if (val == true)
	{
	  save = 'box';
	  AppCtl.setOneLineDb('OPTYPE',save);
	}
};
AppCtl.getOCorner = function()
{
	saved =  AppCtl.getOneLineDb('OPTYPE', 'box');
  	if (saved == 'corner')
	  return 1;
	else
	  return 0;
};
AppCtl.setOCorner = function(val)
{
  	if (val == true)
	{
	  save = 'corner';
	  AppCtl.setOneLineDb('OPTYPE',save);
	}
};
AppCtl.getOfCorner = function()
{
	saved =  AppCtl.getOneLineDb('OPTYPE', 'box');
  	if (saved == 'fcorner')
	  return 1;
	else
	  return 0;
};
AppCtl.setOfCorner = function(val)
{
  	if (val == true)
	{
	  save = 'fcorner';
	  AppCtl.setOneLineDb('OPTYPE',save);
	}
};


//
//  Persist a value in a one line database table
//
AppCtl.getOneLineDb = function(table, init)
{
  	if (Browser)
	{
	  var val = localStorage[table];
	  if (val == null)
	  {
	    val = init;
	    AppCtl.setOneLineDb(table, val);
	  }
	  return val;
	}
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
  	if (Browser)
	{
	  localStorage[table] = val;
	  return;
	}
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

