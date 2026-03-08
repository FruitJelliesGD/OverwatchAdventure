//-----------------------------------------------------------------------------
//  Galv's Timer End Event
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  Galv_TimerEndEvent.js
//-----------------------------------------------------------------------------
//  2017-03-20 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_TimerEndEvent = true;

var Galv = Galv || {};              // Galv's main object
Galv.TEE = Galv.TEE || {};          // Galv's stuff


//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0) Set an event to automatically run when timer ends.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @help
 *   Galv's Timer End Event
 * ----------------------------------------------------------------------------
 * This plugin enables you to call a set common event automatically when the
 * timer ends. By default this will disable the default 'abort battle' when
 * the timer ends while the player is in battle.
 *
 * Script call to change the event or
 *
 *    Galv.TEE.endEvent(id);     // id is the common event id you want to call
 *                               // when the timer ends. Make 0 to do nothing.
 *                               // Leave id blank to set it to abort battle.
 *                               // Default is 0
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

Galv.TEE.endEvent = function(id) {
	if (isNaN(id)) {
		$gameSystem._timerCommonEvent = null;
	} else {
		$gameSystem._timerCommonEvent = id;
	};
};

Galv.TEE.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	this._timerCommonEvent = 0;
	Galv.TEE.Game_System_initialize.call(this);
};

Galv.TEE.Game_Timer_onExpire = Game_Timer.prototype.onExpire;
Game_Timer.prototype.onExpire = function() {
	if (isNaN($gameSystem._timerCommonEvent)) {
		// do default (abort battle on expire)
		Galv.TEE.Game_Timer_onExpire.call(this);
	} else if ($gameSystem._timerCommonEvent > 0) {
		$gameTemp.reserveCommonEvent($gameSystem._timerCommonEvent);
	};
};


})();