describe("Storages::StorageManager", function() {
  var storageManager;
  beforeEach(function() {
    storageManager = new TaskBoard.Storages.StorageManager();
  });

  context("after initialize", function() {
    it("should instantiate both dummy and local storages", function() {

      expect(storageManager.dummyStorage instanceof TaskBoard.Storages.DummyStorage).toBeTruthy();
      expect(storageManager.localStorage instanceof TaskBoard.Storages.LocalStorage).toBeTruthy();
    });
  });

  describe(".loadIssues", function() {
    var eventName, eventData;

    beforeEach(function() {
      spyOn(TaskBoard.observers, 'trigger').andCallFake(function(evName, evData) {
        eventName = evName;
        eventData = evData;
      });
    });

    context("forced to load seed data", function() {
      beforeEach(function() {
        spyOn(storageManager, 'isNeedToLoadSeed').andCallFake(function() {
          return true;
        });

        spyOn(storageManager.dummyStorage, 'loadIssues').andCallFake(function(callback) {
          callback("aloha!");
        });
      });

      it("should choose dummy storage", function() {
        storageManager.loadIssues();

        expect(eventName).toBe("issues::loaded");
        expect(eventData).toBe("aloha!");

        expect(storageManager.isNeedToLoadSeed).toHaveBeenCalled();
        expect(storageManager.dummyStorage.loadIssues).toHaveBeenCalled();
      });
    });

    context("free for loading seed", function() {
      beforeEach(function() {
        spyOn(storageManager, 'isNeedToLoadSeed').andCallFake(function() {
          return false;
        });
        spyOn(storageManager.localStorage, 'loadIssues').andCallFake(function(callback) {
          callback("hello!");
        });
      });

      it("should choose local storage", function() {
        storageManager.loadIssues()

        expect(eventName).toBe("issues::loaded");
        expect(eventData).toBe("hello!");

        expect(storageManager.isNeedToLoadSeed).toHaveBeenCalled();
        expect(storageManager.localStorage.loadIssues).toHaveBeenCalled();
      });

    });
  });

  describe("saveIssues", function() {
    context("when saves data at first time", function() {
      beforeEach(function() {
        spyOn(storageManager, 'isNeedToLoadSeed').andCallFake(function() {
          return true;
        });

        spyOn(storageManager, 'disableLoadingSeed').andCallFake(function() {
        });

        spyOn(storageManager.localStorage, 'saveIssues').andCallFake(function() {
          return "goodbye!";
        });
      });

      it("should choose local storage and disable all next seed loadings", function() {
        expect(storageManager.saveIssues()).toEqual("goodbye!");

        expect(storageManager.isNeedToLoadSeed).toHaveBeenCalled();
        expect(storageManager.disableLoadingSeed).toHaveBeenCalled();
        expect(storageManager.localStorage.saveIssues).toHaveBeenCalled();
      });
    });

    context("when not necessary to load seeds", function() {
      beforeEach(function() {
        spyOn(storageManager, 'isNeedToLoadSeed').andCallFake(function() {
          return false;
        });

        spyOn(storageManager.localStorage, 'saveIssues').andCallFake(function() {
          return "goodbye!";
        });
      });

      it("should choose local storage and disable all next seed loadings", function() {
        expect(storageManager.saveIssues()).toEqual("goodbye!");

        expect(storageManager.isNeedToLoadSeed).toHaveBeenCalled();
        expect(storageManager.localStorage.saveIssues).toHaveBeenCalled();
      });
    });
  });

  describe(".disableLoadingSeed", function() {
    beforeEach(function() {
      $.removeCookie('TaskBoard_noNeedToLoadSeed');
    });

    it("should set cookie", function() {
      storageManager.disableLoadingSeed();
      expect($.cookie('TaskBoard_noNeedToLoadSeed')).toBeTruthy();
    });
  });

  describe(".isNeedToLoadSeed", function() {
    context("when TaskBoard_noNeedToLoadSeed cookie exists", function() {
      beforeEach(function() {
        $.removeCookie('TaskBoard_noNeedToLoadSeed');
      });

      it("should return false", function() {
        expect(storageManager.isNeedToLoadSeed).toBeFalsy();
      });
    });

    context("when TaskBoard_noNeedToLoadSeed cookie exists", function() {
      beforeEach(function() {
        $.cookie('TaskBoard_noNeedToLoadSeed', true);
      });

      it("should return false", function() {
        expect(storageManager.isNeedToLoadSeed).toBeTruthy();
      });

    });
  });
});