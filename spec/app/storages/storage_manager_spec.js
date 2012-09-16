describe("Storages::StorageManager", function() {
  var storageManager, eventName, eventData;

  beforeEach(function() {
    storageManager = new TaskBoard.Storages.StorageManager();
    spyOn(TaskBoard.observers, 'trigger').andCallFake(function(evName, evData) {
      eventName = evName;
      eventData = evData;
    });
  });

  afterEach(function(){
    $.removeCookie(TaskBoard.NO_LOAD_SEED_COOKIE_KEY);
  });

  context("after initialize", function() {
    it("should instantiate both dummy and local storages", function() {
      expect(storageManager.dummyStorage instanceof TaskBoard.Storages.DummyStorage).toBeTruthy();
      expect(storageManager.localStorage instanceof TaskBoard.Storages.LocalStorage).toBeTruthy();
    });
  });

  describe(".loadIssues", function() {
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
        expect(eventData.data).toBe("aloha!");

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
        expect(eventData.data).toBe("hello!");

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
      $.removeCookie(TaskBoard.NO_LOAD_SEED_COOKIE_KEY);
    });

    it("should set cookie", function() {
      storageManager.disableLoadingSeed();
      expect($.cookie(TaskBoard.NO_LOAD_SEED_COOKIE_KEY)).toBeTruthy();
    });
  });

  describe(".isNeedToLoadSeed", function() {
    context("when TaskBoard_noNeedToLoadSeed cookie exists", function() {
      beforeEach(function() {
        $.removeCookie(TaskBoard.NO_LOAD_SEED_COOKIE_KEY);
      });

      it("should return true", function() {
        expect(storageManager.isNeedToLoadSeed()).toBeTruthy();
      });
    });

    context("when TaskBoard_noNeedToLoadSeed cookie exists", function() {
      beforeEach(function() {
        $.cookie(TaskBoard.NO_LOAD_SEED_COOKIE_KEY, true);
      });

      it("should return false", function() {
        expect(storageManager.isNeedToLoadSeed()).toBeFalsy();
      });

    });
  });
});